import { createFileRoute } from "@tanstack/react-router";
import { createDiscordClient } from "../../integrations/discord";

export const Route = createFileRoute("/api/discord-action")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { action, config, nodeId, workflowId } = body;

          // Debug logging to see what's being received
          console.log(
            "Discord API received body:",
            JSON.stringify(body, null, 2),
          );

          // Get Discord token from request body
          const discordToken = body.token;

          if (!discordToken) {
            console.error("Discord API: No bot token found");
            return new Response(
              JSON.stringify({
                error: "Discord bot token not provided in request",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          // Call Discord piece directly without Temporal
          console.log("Calling Discord directly via Discord piece");
          const { DiscordIntegrationService } = await import(
            "../../integrations/discord/service"
          );

          let result;

          // Execute the Discord action based on the action type
          switch (action) {
            case "Send Message":
              if (!config.channelId || !config.message) {
                return new Response(
                  JSON.stringify({
                    error: "Channel ID and message are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "sendMessageWithBot",
                {
                  channel_id: config.channelId,
                  message: config.message,
                  files: config.files || [],
                },
                discordToken,
              );
              break;

            case "Send Webhook Message":
              if (!config.webhookUrl || !config.content) {
                return new Response(
                  JSON.stringify({
                    error: "Webhook URL and content are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "send_message_webhook",
                {
                  webhook_url: config.webhookUrl,
                  content: config.content,
                  username: config.username,
                  avatar_url: config.avatarUrl,
                  embeds: config.embeds,
                  tts: config.tts,
                },
                discordToken,
              );
              break;

            case "Add Role":
              if (!config.guildId || !config.userId || !config.roleId) {
                return new Response(
                  JSON.stringify({
                    error: "Guild ID, user ID, and role ID are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "add_role_to_member",
                {
                  guild_id: config.guildId,
                  user_id: config.userId,
                  role_id: config.roleId,
                },
                discordToken,
              );
              break;

            case "Remove Role":
              if (!config.guildId || !config.userId || !config.roleId) {
                return new Response(
                  JSON.stringify({
                    error: "Guild ID, user ID, and role ID are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "remove_role_from_member",
                {
                  guild_id: config.guildId,
                  user_id: config.userId,
                  role_id: config.roleId,
                },
                discordToken,
              );
              break;

            case "Create Channel":
              if (!config.guildId || !config.name) {
                return new Response(
                  JSON.stringify({
                    error: "Guild ID and channel name are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "create_channel",
                {
                  guild_id: config.guildId,
                  name: config.name,
                },
                discordToken,
              );
              break;

            case "Create Role":
              if (!config.guildId || !config.roleName) {
                return new Response(
                  JSON.stringify({
                    error: "Guild ID and role name are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "createGuildRole",
                {
                  guild_id: config.guildId,
                  role_name: config.roleName,
                  role_color: config.roleColor,
                  display_separated: config.displaySeparated,
                  role_mentionable: config.roleMentionable,
                  creation_reason: config.creationReason,
                },
                discordToken,
              );
              break;

            case "Ban Member":
              if (!config.guildId || !config.userId) {
                return new Response(
                  JSON.stringify({
                    error: "Guild ID and user ID are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "ban_guild_member",
                {
                  guild_id: config.guildId,
                  user_id: config.userId,
                  ban_reason: config.reason,
                },
                discordToken,
              );
              break;

            case "List Members":
              if (!config.guildId || !config.search) {
                return new Response(
                  JSON.stringify({
                    error: "Guild ID and search term are required",
                  }),
                  {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                  },
                );
              }
              result = await DiscordIntegrationService.runDiscordAction(
                "list_guild_members",
                {
                  guild_id: config.guildId,
                  shortText: config.search,
                },
                discordToken,
              );
              break;

            default:
              return new Response(
                JSON.stringify({
                  error: `Unsupported Discord action: ${action}`,
                }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                },
              );
          }

          // Return success response with result
          return new Response(
            JSON.stringify({
              success: true,
              action,
              result,
              nodeId,
              workflowId,
              timestamp: new Date().toISOString(),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        } catch (error) {
          console.error("Discord action execution failed:", error);

          return new Response(
            JSON.stringify({
              success: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Unknown error occurred",
              timestamp: new Date().toISOString(),
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },

      GET: async () => {
        return new Response(
          JSON.stringify({
            message: "Discord Action API endpoint",
            availableActions: [
              "Send Message",
              "Send Webhook Message",
              "Add Role",
              "Remove Role",
              "Create Channel",
              "Create Role",
              "Ban Member",
              "List Members",
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
