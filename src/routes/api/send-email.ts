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
          const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || "noreply@example.com",
            to,
            subject,
            html: content,
          });

          return Response.json({
            success: true,
            messageId: result.data?.id,
          });
        } catch (error) {
          console.error("Error sending email:", error);
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
