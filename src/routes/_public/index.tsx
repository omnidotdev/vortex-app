import { Link, createFileRoute } from "@tanstack/react-router";

import authClient from "@/lib/auth/authClient";

export const Route = createFileRoute("/_public/")({
  component: LandingPage,
});

/**
 * Landing page for Vortex.
 */
function LandingPage() {
  const handleSignIn = () => {
    authClient.signIn.oauth2({
      providerId: "omni",
      callbackURL: "/workspaces",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl">Vortex</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/pricing" className="text-sm hover:underline">
              Pricing
            </Link>
            <button
              onClick={handleSignIn}
              className="cursor-pointer rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
            >
              Sign In
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pt-16 text-center">
        <h1 className="font-bold text-5xl tracking-tight sm:text-6xl">
          Workflow Automation
          <br />
          <span className="text-primary">Made Simple</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Open-source workflow automation engine. Dev-first, JSON-first. Build
          powerful automations with a visual editor or pure code.
        </p>
        <div className="mt-10 flex gap-4">
          <button
            onClick={handleSignIn}
            className="cursor-pointer rounded-md bg-primary px-6 py-3 font-medium text-lg text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </button>
          <a
            href="https://github.com/omnidotdev/vortex"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-md border px-6 py-3 font-medium text-lg hover:bg-accent"
          >
            View on GitHub
          </a>
        </div>

        {/* Features */}
        <div className="mt-20 grid max-w-4xl gap-8 sm:grid-cols-3">
          <div className="rounded-lg border p-6 text-left">
            <h3 className="font-semibold text-lg">JSON-First DSL</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Define workflows as JSON. The web UI is an artifact of the schema,
              not the primary interface.
            </p>
          </div>
          <div className="rounded-lg border p-6 text-left">
            <h3 className="font-semibold text-lg">Temporal Powered</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Built on Temporal for durable execution, retries, and scheduling.
            </p>
          </div>
          <div className="rounded-lg border p-6 text-left">
            <h3 className="font-semibold text-lg">WASM Plugins</h3>
            <p className="mt-2 text-muted-foreground text-sm">
              Extend with Extism plugins in any language that compiles to WASM.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>MIT License. Built with care.</p>
        </div>
      </footer>
    </div>
  );
}
