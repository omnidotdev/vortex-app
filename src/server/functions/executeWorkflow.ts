import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { authMiddleware } from "@/server/middleware";

// Internal URL for server-to-server communication (bypasses CDN/Cloudflare)
const API_INTERNAL_URL =
  process.env.API_INTERNAL_URL || process.env.VITE_API_BASE_URL;

const executeWorkflowSchema = z.object({
  workflowId: z.string().uuid(),
  triggerData: z.record(z.string(), z.unknown()).optional().default({}),
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
    // Use the user's access token so the API resolves the correct organization.
    // Internal secret maps to SERVICE_ORG_ID which won't match user-owned workflows
    const bearerToken = context.session.accessToken;

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
