import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const Route = createFileRoute("/api/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { to, subject, content } = await request.json();

          // Send email directly via Resend
          // For workflow-based email sending, use the workflow execution API
          const from = process.env.EMAIL_FROM;
          if (!from) {
            return Response.json(
              { error: "Email sender not configured" },
              { status: 503 },
            );
          }

          const result = await resend.emails.send({
            from,
            to,
            subject,
            html: content,
          });

          return Response.json({
            success: true,
            messageId: result.data?.id,
          });
        } catch (error) {
          return Response.json(
            {
              error: "Failed to send email",
              details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
