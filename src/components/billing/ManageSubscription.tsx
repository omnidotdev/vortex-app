import { Button } from "@omnidotdev/thornberry/button";

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
  const href = manageSubscriptionUrl(ACCOUNT_URL, BASE_URL, workspaceSlug);

  if (!href) return null;

  return (
    <Button size="sm" variant="outline" asChild>
      <a href={href}>Manage Billing</a>
    </Button>
  );
};

export default ManageSubscription;
