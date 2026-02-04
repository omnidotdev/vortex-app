import authClient from "@/lib/auth/authClient";
import { clearRowIdCache } from "@/server/functions/auth";

/**
 * Sign out from the application.
 */
const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: async () => {
        // Clear the rowId cache cookie
        await clearRowIdCache();
        window.location.href = "/";
      },
    },
  });
};

export default signOut;
