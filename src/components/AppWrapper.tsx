"use client";

import { Loader2, Workflow } from "lucide-react";

import { LandingPage } from "@/components/LandingPage";
import { useAuth } from "@/contexts/AuthContext";
import { IntegrationsProvider } from "@/contexts/IntegrationsContext";
import { WorkflowApp } from "./WorkflowApp";

export function AppWrapper() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-linear-to-br from-background via-background to-muted">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary">
            <Workflow className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="font-medium text-foreground text-lg">
              Loading Vortex...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Show the main workflow application for authenticated users
  return (
    <IntegrationsProvider>
      <WorkflowApp />
    </IntegrationsProvider>
  );
}
