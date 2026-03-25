import { Format } from "@ark-ui/react";
import { useMutation } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { BuildingIcon, CheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import CreateWorkspaceModal from "@/components/pricing/CreateWorkspaceModal";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
} from "@/components/ui/card";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import signIn from "@/lib/auth/signIn";
import { BASE_URL, hasBilling } from "@/lib/config/env.config";
import useDialogStore, { DialogType } from "@/lib/hooks/store/useDialogStore";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { cn } from "@/lib/utils";
import { createCheckoutWithWorkspace } from "@/server/functions/subscriptions";

import type { OrganizationClaim } from "@/lib/auth/getAuth";
import type { Price, Subscription } from "@/lib/providers/billing";

interface Props {
  price: Price;
  orgSubscriptions?: Record<string, Subscription | null>;
}

// Vortex tier hierarchy for upgrade logic
const TIER_ORDER = ["free", "starter", "pro", "team", "enterprise"] as const;
type Tier = (typeof TIER_ORDER)[number];

export const PriceCard = ({ price, orgSubscriptions = {} }: Props) => {
  const { session } = useRouteContext({ strict: false });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { tier?: string };
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const { setIsOpen: setCreateWorkspaceOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const tier = (price.metadata?.tier as Tier) ?? "free";
  const isProTier = tier === "pro";
  const isFreeTier = tier === "free";
  const isEnterpriseTier = tier === "enterprise";

  // Helper to get tier from subscription
  const getOrgTier = (orgId: string): Tier => {
    const subscription = orgSubscriptions[orgId];
    if (!subscription) return "free";
    // Product name is like "Vortex Pro" or "Vortex Team"
    const productName = subscription.product?.name?.toLowerCase() ?? "";
    if (productName.includes("enterprise")) return "enterprise";
    if (productName.includes("team")) return "team";
    if (productName.includes("pro")) return "pro";
    if (productName.includes("starter")) return "starter";
    return "free";
  };

  // Get tier index for comparison
  const getTierIndex = (t: Tier): number => TIER_ORDER.indexOf(t);

  // Categorize organizations by their upgrade eligibility for this tier
  const allOrgs = (session?.organizations ?? []) as OrganizationClaim[];
  const upgradeableOrgs = allOrgs.filter(
    (org) => getTierIndex(getOrgTier(org.id)) < getTierIndex(tier),
  );
  const nonUpgradeableOrgs = allOrgs.filter(
    (org) => getTierIndex(getOrgTier(org.id)) >= getTierIndex(tier),
  );

  // Check if this card's tier matches the URL param (for post-sign-in auto-open)
  const shouldAutoOpen = search.tier === tier && !!session;

  const { mutateAsync: initiateCheckout } = useMutation({
    mutationFn: async (params: {
      workspaceId?: string;
      createWorkspace?: { name: string; slug: string };
    }) => {
      setIsCheckoutLoading(true);
      return createCheckoutWithWorkspace({
        data: {
          priceId: price.id,
          successUrl: `${BASE_URL}/workspaces/__SLUG__/settings`,
          cancelUrl: `${BASE_URL}/pricing`,
          ...params,
        },
      });
    },
    onSuccess: (result) => {
      // Redirect to Stripe checkout
      window.location.href = result.checkoutUrl;
    },
    onError: () => {
      setIsCheckoutLoading(false);
    },
  });

  // Handle workspace selection from dropdown
  const handleWorkspaceSelect = (workspaceId: string) => {
    if (workspaceId === "create-new") {
      setCreateWorkspaceOpen(true);
    } else {
      initiateCheckout({ workspaceId });
    }
  };

  // Handle new workspace creation from modal
  const handleCreateWorkspace = (name: string, slug: string) => {
    setCreateWorkspaceOpen(false);
    initiateCheckout({ createWorkspace: { name, slug } });
  };

  const handleClick = () => {
    // Enterprise - contact sales
    if (isEnterpriseTier) {
      window.location.href =
        "mailto:sales@omni.dev?subject=Vortex%20Enterprise";
      return;
    }

    if (!session) {
      // Not logged in - sign in first, redirect back to pricing with tier
      if (!hasBilling) {
        // No billing configured, redirect to home which triggers auth flow
        navigate({ to: "/" });
      } else {
        signIn({
          redirectUrl: `${BASE_URL}/pricing?tier=${tier}`,
          providerId: "omni",
        });
      }
      return;
    }

    // Free tier - just go to workspaces
    if (isFreeTier) {
      if (!session.organizations?.length) {
        // No orgs - go to workspaces (will auto-provision for self-hosted)
        navigate({ to: "/workspaces" });
      } else {
        const firstOrg = session.organizations[0];
        navigate({
          to: "/workspaces/$workspaceSlug",
          params: { workspaceSlug: firstOrg.slug },
        });
      }
      return;
    }

    // No billing configured, just go to workspaces
    if (!hasBilling) {
      navigate({ to: "/workspaces" });
      return;
    }

    // Paid tier without orgs - open create workspace modal
    if (!session.organizations?.length) {
      setCreateWorkspaceOpen(true);
      return;
    }

    // Has orgs - dropdown handles the rest (menu opens automatically)
  };

  // Show dropdown if authenticated, has upgradeable orgs or can create new, paid tier, SaaS
  const showDropdown =
    !!session &&
    !isFreeTier &&
    !isEnterpriseTier &&
    hasBilling &&
    !!session.organizations?.length;

  const getButtonContent = () => {
    if (isFreeTier) return "Get Started";
    if (isEnterpriseTier) return "Contact Sales";
    return `Continue with ${capitalizeFirstLetter(tier)}`;
  };

  return (
    <>
      <CardRoot
        key={price?.id}
        className={cn(
          "relative flex flex-1 flex-col border-2",
          isProTier &&
            "border-primary-700 bg-primary-50 shadow-primary/20 dark:border-primary dark:bg-primary-1000",
        )}
      >
        {isProTier && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-primary-700 px-3 py-1 font-medium text-primary-foreground text-sm dark:bg-primary">
              Recommended
            </span>
          </div>
        )}
        <CardHeader
          className={cn(
            "mb-4 rounded-xl rounded-b-none bg-muted pb-8 text-center",
            isProTier && "bg-primary-400/10 dark:bg-primary-950/80",
          )}
        >
          <CardTitle className="font-bold text-2xl">
            {capitalizeFirstLetter(tier)}
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            {price.product?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8 text-center">
          <div className="mb-8">
            <div className="flex items-baseline justify-center font-bold text-4xl">
              {isEnterpriseTier ? (
                <span>Custom</span>
              ) : (
                <Format.Number
                  value={(price.unit_amount ?? 0) / 100}
                  style="currency"
                  notation="compact"
                  currency="USD"
                />
              )}
              {!isEnterpriseTier && (
                <span className="ml-1 font-medium text-lg text-muted-foreground">
                  {price.recurring && `/workspace/${price.recurring.interval}`}
                </span>
              )}
            </div>
          </div>

          <ul className="space-y-4 text-left">
            {price.product?.marketing_features.map((feature) => (
              <li key={feature.name} className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                  <CheckIcon
                    size={14}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>

                <span className="text-foreground leading-6">
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto pt-8">
          {showDropdown ? (
            <MenuRoot
              defaultOpen={shouldAutoOpen}
              onSelect={({ value }) => handleWorkspaceSelect(value)}
            >
              <MenuTrigger asChild>
                <Button
                  variant={isProTier ? undefined : "outline"}
                  size="lg"
                  className="w-full font-semibold"
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? "Loading..." : getButtonContent()}
                </Button>
              </MenuTrigger>
              <MenuPositioner className="!w-[var(--reference-width)]">
                <MenuContent className="w-full">
                  {allOrgs.length > 0 && (
                    <>
                      <MenuItemGroup>
                        <MenuItemGroupLabel className="text-muted-foreground">
                          Your workspaces
                        </MenuItemGroupLabel>

                        {upgradeableOrgs.map((org: OrganizationClaim) => (
                          <MenuItem
                            key={org.id}
                            value={org.id}
                            className="cursor-pointer"
                          >
                            <MenuItemText className="flex w-full items-center gap-2">
                              <BuildingIcon
                                size={16}
                                className="text-muted-foreground"
                              />
                              <span className="flex-1 truncate font-medium text-sm">
                                {org.name}
                              </span>
                              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary text-xs">
                                Upgrade
                              </span>
                            </MenuItemText>
                          </MenuItem>
                        ))}

                        {nonUpgradeableOrgs.map((org: OrganizationClaim) => {
                          const orgTier = getOrgTier(org.id);
                          const isSameTier = orgTier === tier;

                          return (
                            <MenuItem
                              key={org.id}
                              value={org.id}
                              disabled
                              className="opacity-60"
                            >
                              <MenuItemText className="flex w-full items-center gap-2">
                                <BuildingIcon
                                  size={16}
                                  className="text-muted-foreground"
                                />
                                <span className="flex-1 truncate font-medium text-sm">
                                  {org.name}
                                </span>
                                <span className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground text-xs">
                                  {isSameTier
                                    ? "Current plan"
                                    : capitalizeFirstLetter(orgTier)}
                                </span>
                              </MenuItemText>
                            </MenuItem>
                          );
                        })}
                      </MenuItemGroup>

                      <MenuSeparator />
                    </>
                  )}

                  <MenuItemGroup>
                    <MenuItem value="create-new" className="cursor-pointer">
                      <MenuItemText className="flex w-full items-center gap-2">
                        <PlusIcon size={16} className="text-muted-foreground" />
                        <span className="font-medium text-sm">
                          New workspace
                        </span>
                      </MenuItemText>
                    </MenuItem>
                  </MenuItemGroup>
                </MenuContent>
              </MenuPositioner>
            </MenuRoot>
          ) : (
            <Button
              variant={isProTier ? undefined : "outline"}
              size="lg"
              className="w-full font-semibold"
              onClick={handleClick}
              disabled={isCheckoutLoading}
            >
              {isCheckoutLoading ? "Loading..." : getButtonContent()}
            </Button>
          )}
        </CardFooter>
      </CardRoot>

      {/* Modal for creating new workspace */}
      <CreateWorkspaceModal
        tierName={capitalizeFirstLetter(tier)}
        onSubmit={handleCreateWorkspace}
        isLoading={isCheckoutLoading}
      />
    </>
  );
};
