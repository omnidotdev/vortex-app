import authClient from "@/lib/auth/authClient";

/**
 * Sign out from the application.
 */
const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.href = "/";
      },
    },
  });
};

export default signOut;
