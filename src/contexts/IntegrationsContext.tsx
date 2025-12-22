"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Integration {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  isEnabled: boolean;
  config: Record<string, any>;
}

interface IntegrationsContextType {
  integrations: Integration[];
  updateIntegration: (id: string, config: Partial<Integration>) => void;
  getIntegration: (id: string) => Integration | undefined;
  isIntegrationEnabled: (id: string) => boolean;
  getIntegrationToken: (id: string) => string | undefined;
  setIntegrationToken: (id: string, token: string) => void;
  removeIntegration: (id: string) => void;
}

const IntegrationsContext = createContext<IntegrationsContextType | undefined>(
  undefined,
);

const defaultIntegrations: Integration[] = [
  {
    id: "linkedin",
    name: "linkedin",
    displayName: "LinkedIn",
    description: "Post updates, manage connections, and monitor activity",
    icon: "Linkedin",
    isEnabled: false,
    config: {
      accessToken: "",
      clientId: "",
      clientSecret: "",
    },
  },
  {
    id: "slack",
    name: "slack",
    displayName: "Slack",
    description: "Send messages, create channels, and manage workspaces",
    icon: "Slack",
    isEnabled: false,
    config: {
      botToken: "",
      appToken: "",
      signingSecret: "",
    },
  },
  {
    id: "notion",
    name: "notion",
    displayName: "Notion",
    description: "Create pages, update databases, and manage content",
    icon: "FileText",
    isEnabled: false,
    config: {
      token: "",
      databaseId: "",
    },
  },
];

interface IntegrationsProviderProps {
  children: React.ReactNode;
}

export function IntegrationsProvider({ children }: IntegrationsProviderProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  // Load integrations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("vortex-integrations");
    if (stored) {
      try {
        const parsedIntegrations = JSON.parse(stored);
        // Merge with defaults to ensure new integrations are added
        const merged = defaultIntegrations.map((defaultInteg) => {
          const stored = parsedIntegrations.find(
            (p: Integration) => p.id === defaultInteg.id,
          );
          return stored ? { ...defaultInteg, ...stored } : defaultInteg;
        });
        setIntegrations(merged);
      } catch (error) {
        console.error("Failed to parse stored integrations:", error);
        setIntegrations(defaultIntegrations);
      }
    } else {
      setIntegrations(defaultIntegrations);
    }
  }, []);

  // Save integrations to localStorage whenever they change
  useEffect(() => {
    if (integrations.length > 0) {
      localStorage.setItem("vortex-integrations", JSON.stringify(integrations));
    }
  }, [integrations]);

  const updateIntegration = (id: string, updates: Partial<Integration>) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, ...updates } : integration,
      ),
    );
  };

  const getIntegration = (id: string) => {
    return integrations.find((integration) => integration.id === id);
  };

  const isIntegrationEnabled = (id: string) => {
    const integration = getIntegration(id);
    if (!integration) {
      return false;
    }

    // Check if integration has required tokens/config
    let enabled = false;
    switch (id) {
      case "linkedin":
        enabled = integration.isEnabled && !!integration.config?.accessToken;
        break;
      case "slack":
        enabled = integration.isEnabled && !!integration.config?.botToken;
        break;
      case "notion":
        enabled = integration.isEnabled && !!integration.config?.token;
        break;
      default:
        enabled = integration.isEnabled;
    }

    return enabled;
  };

  const getIntegrationToken = (id: string) => {
    const integration = getIntegration(id);
    if (!integration) return undefined;

    switch (id) {
      case "linkedin":
        return integration.config?.accessToken;
      case "slack":
        return integration.config?.botToken;
      case "notion":
        return integration.config?.token;
      default:
        return integration.config?.token;
    }
  };

  const setIntegrationToken = (id: string, token: string) => {
    const integration = getIntegration(id);
    if (!integration) return;

    const tokenKey = (() => {
      switch (id) {
        case "linkedin":
          return "accessToken";
        case "slack":
          return "botToken";
        case "notion":
          return "token";
        default:
          return "token";
      }
    })();

    updateIntegration(id, {
      config: {
        ...integration.config,
        [tokenKey]: token,
      },
      isEnabled: !!token, // Auto-enable when token is set
    });
  };

  const removeIntegration = (id: string) => {
    const integration = getIntegration(id);
    if (!integration) return;

    updateIntegration(id, {
      isEnabled: false,
      config: Object.keys(integration.config).reduce(
        (acc, key) => ({ ...acc, [key]: "" }),
        {},
      ),
    });
  };

  return (
    <IntegrationsContext.Provider
      value={{
        integrations,
        updateIntegration,
        getIntegration,
        isIntegrationEnabled,
        getIntegrationToken,
        setIntegrationToken,
        removeIntegration,
      }}
    >
      {children}
    </IntegrationsContext.Provider>
  );
}

export function useIntegrations() {
  const context = useContext(IntegrationsContext);
  if (context === undefined) {
    throw new Error(
      "useIntegrations must be used within an IntegrationsProvider",
    );
  }
  return context;
}

// Utility hooks for specific integrations
export function useLinkedInIntegration() {
  const { getIntegration, isIntegrationEnabled, getIntegrationToken } =
    useIntegrations();

  return {
    integration: getIntegration("linkedin"),
    isEnabled: isIntegrationEnabled("linkedin"),
    token: getIntegrationToken("linkedin"),
  };
}
