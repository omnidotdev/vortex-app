import { Button } from "@/components/ui/button";
import useHubLoginHint from "@/lib/auth/useHubLoginHint";
import { manageSubscriptionUrl } from "@/lib/billing/hubLinks";
import { ACCOUNT_URL, BASE_URL } from "@/lib/config/env.config";

interface Props {
  /** Workspace whose subscription to manage */
  workspaceSlug: string;
}

/**
 * Manage a workspace's subscription (plan, payment method, invoices) on the
 * Omni account hub, which opens the billing portal and returns to this
 * workspace's settings page. Hidden when no account hub is configured
 */
const ManageSubscription = ({ workspaceSlug }: Props) => {
  // The hub opens as the account Vortex is signed in as
  const loginHint = useHubLoginHint();

  const href = manageSubscriptionUrl(
    ACCOUNT_URL,
    BASE_URL,
    workspaceSlug,
    loginHint,
  );

  if (!href) return null;

  return (
    <Button size="sm" variant="outline" asChild>
      <a href={href}>Manage Billing</a>
    </Button>
  );
};

export default ManageSubscription;
