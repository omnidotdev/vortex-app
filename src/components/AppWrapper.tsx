"use client";

import React from "react";
import { Loader2, Workflow } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { IntegrationsProvider } from "@/contexts/IntegrationsContext";
import { LandingPage } from "@/components/LandingPage";
import { WorkflowApp } from "./WorkflowApp";

export function AppWrapper() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-primary rounded-md flex items-center justify-center">
            <Workflow className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-lg font-medium text-foreground">
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
