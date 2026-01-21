import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/oauth/error")({
  component: OAuthError,
  validateSearch: (search) => ({
    error: (search.error as string) || "unknown_error",
    description: (search.description as string) || "",
  }),
});

function OAuthError() {
  const search = useSearch({ from: "/_public/oauth/error" });
  const navigate = useNavigate();

  const errorMessages: Record<string, string> = {
    access_denied: "You denied access to the application.",
    invalid_request: "The authorization request was invalid.",
    unauthorized_client: "The application is not authorized.",
    unsupported_response_type: "The response type is not supported.",
    invalid_scope: "The requested scope is invalid.",
    server_error: "The authorization server encountered an error.",
    temporarily_unavailable: "The server is temporarily unavailable.",
    callback_failed: "Failed to process the OAuth callback.",
    missing_params: "Required parameters were missing from the callback.",
    unknown_error: "An unknown error occurred.",
  };

  const errorMessage =
    search.description ||
    errorMessages[search.error] ||
    errorMessages.unknown_error;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 rounded-lg border bg-card p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="font-semibold text-2xl">OAuth Error</h1>
        <p className="text-muted-foreground">{errorMessage}</p>
        {search.error !== "unknown_error" && (
          <p className="font-mono text-muted-foreground text-xs">
            Error code: {search.error}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <Button onClick={() => navigate({ to: "/workspaces" })}>
            Return to Workspaces
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
