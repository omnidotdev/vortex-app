import { getAuth } from "@/lib/auth/getAuth";
import { SERVER_AUTH_BASE_URL } from "@/lib/config/env.config";

/**
 * Proxy a request to Gatekeeper's Better Auth API, forwarding
 * the user's OAuth access token for authentication.
 */
export async function proxyToGatekeeper(
  request: Request,
  path: string,
): Promise<Response> {
  const session = await getAuth(request);
  if (!session?.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Strip /api/auth prefix so /api/auth/api-key/create → /api-key/create
  const forwardPath = path.replace(/^\/api\/auth/, "");
  const url = `${SERVER_AUTH_BASE_URL}${forwardPath}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${session.accessToken}`,
    Origin: SERVER_AUTH_BASE_URL!,
  };

  const isPost = request.method === "POST";
  if (isPost) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(url, {
      method: request.method,
      headers,
      body: isPost ? await request.text() : undefined,
    });

    return new Response(res.body, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[gatekeeperProxy] Failed to proxy request:", err);
    return Response.json(
      { error: "Failed to reach authentication service" },
      { status: 502 },
    );
  }
}
