import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { getAuth } from "@/lib/auth/getAuth";

/**
 * Fetch the current session with access token for GraphQL.
 */
export const fetchSession = createServerFn().handler(async () => {
  const request = getRequest();

  const session = await getAuth(request);

  return { session };
});

/**
 * Sign out the current user and redirect to home.
 */
export const signOutAndRedirect = createServerFn({ method: "POST" }).handler(
  async () => {
    const request = getRequest();

    await auth.api.signOut({ headers: request.headers });

    throw redirect({ to: "/" });
  },
);
