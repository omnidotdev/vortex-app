import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/oauth/callback")({
  component: OAuthCallback,
  validateSearch: (search) => ({
    oauth: (search.oauth as string) || "",
    provider: (search.provider as string) || "",
    integration_id: (search.integration_id as string) || "",
    error: (search.error as string) || "",
    description: (search.description as string) || "",
  }),
});

function OAuthCallback() {
  const search = useSearch({ from: "/_public/oauth/callback" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [countdown, setCountdown] = useState(5);

  const isSuccess = search.oauth === "success";
  const isError = search.error || search.oauth === "error";

  useEffect(() => {
    // Invalidate integrations queries to refresh the list
    queryClient.invalidateQueries({ queryKey: ["integrations"] });

    // Auto-redirect after 5 seconds on success
    if (isSuccess) {
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            navigate({ to: "/workspaces" });
            return 0;
          }
          return c - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSuccess, navigate, queryClient]);

  if (!isSuccess && !isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Processing OAuth callback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 rounded-lg border bg-card p-8 text-center shadow-sm">
        {isSuccess ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="font-semibold text-2xl">Connected Successfully!</h1>
            <p className="text-muted-foreground">
              Your {search.provider} integration has been connected.
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Redirecting in {countdown} seconds...
              </p>
              <Button onClick={() => navigate({ to: "/workspaces" })}>
                Go to Workspaces
              </Button>
            </div>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="font-semibold text-2xl">Connection Failed</h1>
            <p className="text-muted-foreground">
              {search.description || "Failed to connect the integration."}
            </p>
            <p className="text-muted-foreground text-sm">
              Error: {search.error}
            </p>
            <Button onClick={() => navigate({ to: "/workspaces" })}>
              Return to Workspaces
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
