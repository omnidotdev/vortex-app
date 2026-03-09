import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { authMiddleware } from "@/server/middleware";

// Internal URL for server-to-server communication (bypasses CDN/Cloudflare)
const API_INTERNAL_URL =
  process.env.API_INTERNAL_URL || process.env.VITE_API_BASE_URL;

const executeWorkflowSchema = z.object({
  workflowId: z.string().uuid(),
  triggerData: z.record(z.unknown()).optional().default({}),
});

/**
 * Execute a workflow by proxying to the API's trigger endpoint.
 */
export const executeWorkflow = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data) => executeWorkflowSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { workflowId, triggerData } = data;

    const apiUrl = `${API_INTERNAL_URL}/api/v1/workflows/${workflowId}/trigger`;
    const internalSecret = process.env.INTERNAL_API_SECRET;

    // Prefer internal secret for service-to-service auth,
    // fall back to user's access token for session-based auth
    const bearerToken = internalSecret || context.session.accessToken;

    if (!bearerToken) {
      throw new Error("No credentials available for workflow execution");
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({ data: triggerData }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error ?? "Trigger failed");
    }

    return { success: true, ...result };
  });
