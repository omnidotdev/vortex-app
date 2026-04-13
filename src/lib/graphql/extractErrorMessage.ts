/**
 * Extract a user-friendly error message from a GraphQL error.
 *
 * `graphql-request`'s `ClientError.message` includes the full JSON response,
 * which is not useful for display. This extracts the first GraphQL error
 * message, falling back to a generic message.
 * @param err - Error from a GraphQL mutation/query.
 * @param fallback - Fallback message if no GraphQL error is found.
 * @returns User-friendly error message.
 */
const extractErrorMessage = (err: unknown, fallback = "An error occurred") => {
  if (err && typeof err === "object" && "response" in err) {
    const response = (
      err as {
        response: { errors?: Array<{ message: string }> };
      }
    ).response;

    const message = response?.errors?.[0]?.message;

    if (message) return message;
  }

  if (err instanceof Error) return err.message;

  return fallback;
};

export default extractErrorMessage;
