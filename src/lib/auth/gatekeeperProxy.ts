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

  // Forward the full path to Gatekeeper (Gatekeeper uses basePath "/api/auth")
  const url = `${SERVER_AUTH_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${session.accessToken}`,
    Origin: SERVER_AUTH_BASE_URL!,
  };

  const hasBody =
    request.method === "POST" ||
    request.method === "PUT" ||
    request.method === "PATCH";
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const fetchInit: RequestInit = {
      method: request.method,
      headers,
    };

    // Only read and forward the body for methods that support one
    if (hasBody) {
      fetchInit.body = await request.text();
    }

    const res = await fetch(url, fetchInit);

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
