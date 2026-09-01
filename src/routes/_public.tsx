import { AppFooter } from "@omnidotdev/thornberry/app-footer";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  LuGithub as GithubIcon,
  LuLinkedin as LinkedinIcon,
} from "react-icons/lu";
import { SiDiscord as DiscordIcon, SiX as XIcon } from "react-icons/si";

import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/authClient";
import signOut from "@/lib/auth/signOut";
import app from "@/lib/config/app.config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

/**
 * Public layout for unauthenticated pages (landing, pricing, etc.)
 */
function PublicLayout() {
  const { session } = Route.useRouteContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only treat the user as "signed in" if fully provisioned (has rowId)
  // A session without rowId is a zombie session that will be cleared on
  // next navigation, don't show "Sign Out" for it
  const isAuthenticated = !!session?.user?.rowId;

  const handleSignIn = () => {
    authClient.signIn.social({
      provider: "omni",
      callbackURL: "/workspaces",
    });
  };

  return (
    <div className="relative min-h-dvh">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50">
        <header className="w-full border-b bg-background/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80">
                <img src="/logo.png" alt="Vortex" className="h-7 w-7" />
                <span className="font-semibold text-foreground text-lg">
                  Vortex
                </span>
                <Badge className="hidden border-primary/20 bg-primary/10 text-primary text-xs sm:inline-flex dark:text-primary-300">
                  Early Access
                </Badge>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  to="/pricing"
                  className="rounded-md px-3 py-2 font-medium text-muted-foreground text-sm hover:text-foreground"
                >
                  Pricing
                </Link>

                <a
                  href={app.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-3 py-2 font-medium text-muted-foreground text-sm hover:text-foreground"
                >
                  Docs
                </a>

                <ThemeToggle />

                {isAuthenticated ? (
                  <Button variant="outline" onClick={signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <Button onClick={handleSignIn}>Sign In</Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "border-t bg-background/95 backdrop-blur-xl md:hidden",
              mobileMenuOpen ? "block" : "hidden",
            )}
          >
            <div className="space-y-1 px-4 py-3">
              <Link
                to="/pricing"
                className="block rounded-md px-3 py-2 font-medium text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              <a
                href={app.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 font-medium text-muted-foreground text-sm hover:bg-accent hover:text-foreground"
              >
                Docs
              </a>

              <div className="pt-2">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    onClick={signOut}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button onClick={handleSignIn} className="w-full">
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-dvh w-full flex-col">
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <AppFooter
          appLogo={
            <img src="/logo.png" alt="Vortex" className="size-4 opacity-60" />
          }
          appSymbol={app.icon}
          docsUrl={app.links.docs}
          orgUrl={app.organization.url}
          socials={
            <>
              <a
                href={app.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded px-2 py-1 transition-colors hover:text-foreground"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={app.organization.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded px-2 py-1 transition-colors hover:text-foreground"
              >
                <XIcon size={20} />
              </a>
              <a
                href={app.organization.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded px-2 py-1 transition-colors hover:text-foreground"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={app.organization.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="rounded px-2 py-1 transition-colors hover:text-foreground"
              >
                <DiscordIcon size={20} />
              </a>
            </>
          }
        />
      </div>
    </div>
  );
}
