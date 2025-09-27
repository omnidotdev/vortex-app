import { json } from "@tanstack/react-start";
import { getTemporalClient } from "../../temporal/client";
import { z } from "zod";

// Discord webhook event schema
const DiscordWebhookEventSchema = z.object({
  type: z.string(),
  guild_id: z.string().optional(),
  channel_id: z.string().optional(),
  user_id: z.string().optional(),
  message: z.any().optional(),
  member: z.any().optional(),
  data: z.any(),
  timestamp: z.string().optional(),
});

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();

    // Validate the webhook payload
    const event = DiscordWebhookEventSchema.parse(body);

    // Get Temporal client
    const client = await getTemporalClient();

    // Route the event to appropriate workflow based on type
    let workflowId: string;
    let workflowType: string;

    switch (event.type) {
      case "message":
        workflowId = `discord-message-${event.channel_id}-${Date.now()}`;
        workflowType = "processDiscordMessage";
        break;
      case "member_join":
        workflowId = `discord-member-join-${event.guild_id}-${Date.now()}`;
        workflowType = "processDiscordMemberJoin";
        break;
      case "member_leave":
        workflowId = `discord-member-leave-${event.guild_id}-${Date.now()}`;
        workflowType = "processDiscordMemberLeave";
        break;
      case "reaction_add":
        workflowId = `discord-reaction-${event.channel_id}-${Date.now()}`;
        workflowType = "processDiscordReaction";
        break;
      default:
        workflowId = `discord-generic-${event.type}-${Date.now()}`;
        workflowType = "processDiscordGenericEvent";
    }

    // Start the appropriate workflow
    const handle = await client.workflow.start(workflowType, {
      args: [event],
      taskQueue: "vortex",
      workflowId,
    });

    return json({
      success: true,
      workflowId: handle.workflowId,
      message: "Discord event processed successfully"
    });

  } catch (error) {
    console.error("Discord webhook error:", error);

    return json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET({ request }: { request: Request }) {
  // Health check endpoint
  return json({
    status: "healthy",
    service: "Discord Webhook API",
    timestamp: new Date().toISOString()
  });
}

// Discord webhook verification (for bot events)
export async function PUT({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const challenge = url.searchParams.get("hub.challenge");

    if (challenge) {
      return new Response(challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    }

    return json({ error: "No challenge provided" }, { status: 400 });

  } catch (error) {
    console.error("Discord webhook verification error:", error);
    return json({ error: "Verification failed" }, { status: 500 });
  }
}
