import { discord } from "@activepieces/piece-discord";
import { getTemporalClient } from "../../temporal/client";

export class DiscordIntegrationService {
  private auth: string;

  constructor(botToken: string) {
    this.auth = botToken;
  }

  // Execute Discord actions through Temporal workflows
  async executeAction(actionName: string, props: any) {
    console.log(
      `🚀 [DISCORD SERVICE] Starting Temporal workflow for action: ${actionName}`,
    );
    console.log(
      `📋 [DISCORD SERVICE] Action props:`,
      JSON.stringify(props, null, 2),
    );

    const client = await getTemporalClient();

    const handle = await client.workflow.start("discordActionWorkflow", {
      args: [{ actionName, props, auth: this.auth }],
      taskQueue: "vortex",
      workflowId: `discord-action-${actionName}-${Date.now()}`,
    });

    console.log(
      `✅ [DISCORD SERVICE] Temporal workflow started: ${handle.workflowId}`,
    );
    console.log(
      `🔗 [DISCORD SERVICE] View in UI: http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
    );

    return handle;
  }

  // Start Discord triggers through Temporal workflows
  async startTrigger(triggerName: string, props: any, webhookUrl?: string) {
    console.log(
      `🎯 [DISCORD SERVICE] Starting Temporal workflow for trigger: ${triggerName}`,
    );
    console.log(
      `📋 [DISCORD SERVICE] Trigger props:`,
      JSON.stringify(props, null, 2),
    );
    if (webhookUrl) {
      console.log(`🔗 [DISCORD SERVICE] Webhook URL: ${webhookUrl}`);
    }

    const client = await getTemporalClient();

    const handle = await client.workflow.start("discordTriggerWorkflow", {
      args: [{ triggerName, props, auth: this.auth, webhookUrl }],
      taskQueue: "vortex",
      workflowId: `discord-trigger-${triggerName}-${Date.now()}`,
    });

    console.log(
      `✅ [DISCORD SERVICE] Temporal workflow started: ${handle.workflowId}`,
    );
    console.log(
      `🔗 [DISCORD SERVICE] View in UI: http://localhost:8080/namespaces/default/workflows/${handle.workflowId}`,
    );

    return handle;
  }

  // Helper methods for common actions
  async sendMessage(channelId: string, message?: string, files?: any[]) {
    console.log(
      `💬 [DISCORD SERVICE] Sending message to channel ${channelId} via Temporal`,
    );
    return this.executeAction("sendMessageWithBot", {
      channel_id: channelId,
      message,
      files,
    });
  }

  async sendWebhookMessage(
    webhookUrl: string,
    content: string,
    options?: {
      username?: string;
      avatar_url?: string;
      embeds?: any[];
      tts?: boolean;
    },
  ) {
    return this.executeAction("send_message_webhook", {
      webhook_url: webhookUrl,
      content,
      ...options,
    });
  }

  async addRole(guildId: string, userId: string, roleId: string) {
    return this.executeAction("add_role_to_member", {
      guild_id: guildId,
      user_id: userId,
      role_id: roleId,
    });
  }

  async removeRole(guildId: string, userId: string, roleId: string) {
    return this.executeAction("remove_role_from_member", {
      guild_id: guildId,
      user_id: userId,
      role_id: roleId,
    });
  }

  async createChannel(guildId: string, name: string) {
    return this.executeAction("create_channel", {
      guild_id: guildId,
      name,
    });
  }

  async createRole(
    guildId: string,
    roleName: string,
    options?: {
      role_color?: string;
      display_separated?: boolean;
      role_mentionable?: boolean;
      creation_reason?: string;
    },
  ) {
    return this.executeAction("createGuildRole", {
      guild_id: guildId,
      role_name: roleName,
      ...options,
    });
  }

  async banMember(guildId: string, userId: string, reason?: string) {
    return this.executeAction("ban_guild_member", {
      guild_id: guildId,
      user_id: userId,
      ban_reason: reason,
    });
  }

  // Helper methods for triggers
  async watchNewMessages(
    channelId: string,
    limit?: number,
    webhookUrl?: string,
  ) {
    return this.startTrigger(
      "new_message",
      {
        channel: channelId,
        limit,
      },
      webhookUrl,
    );
  }

  async watchNewMembers(guildId: string, limit?: number, webhookUrl?: string) {
    return this.startTrigger(
      "new_member",
      {
        guildId,
        limit,
      },
      webhookUrl,
    );
  }

  // Direct execution methods for immediate use (bypassing Temporal)
  static async runDiscordAction(actionName: string, props: any, auth: string) {
    console.log(
      `⚡ [DISCORD SERVICE] Calling Discord directly via Discord piece: ${actionName}`,
    );
    // Import the action functions directly and execute them
    // This bypasses the complex context requirements
    const actionModule = await import("@activepieces/piece-discord");
    const piece = actionModule.discord;

    try {
      const action = piece.getAction(actionName);
      if (!action) {
        throw new Error(`Discord action '${actionName}' not found`);
      }

      // Create minimal context for direct execution
      const result = await action.run({
        auth,
        propsValue: props,
      } as any);

      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  static async runDiscordTrigger(
    triggerName: string,
    props: any,
    auth: string,
  ) {
    console.log(
      `⚡ [DISCORD SERVICE] Calling Discord directly via Discord piece: ${triggerName}`,
    );
    const actionModule = await import("@activepieces/piece-discord");
    const piece = actionModule.discord;

    try {
      const trigger = piece.getTrigger(triggerName);
      if (!trigger) {
        throw new Error(`Discord trigger '${triggerName}' not found`);
      }

      // Create minimal context for direct execution
      const result = await trigger.run({
        auth,
        propsValue: props,
      } as any);

      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  // Get available actions and triggers
  static getAvailableActions() {
    const actions = discord.actions();
    return Object.keys(actions).map((key) => {
      const action = actions[key];
      return {
        name: key,
        displayName: action?.displayName || key,
        description: action?.description || "",
        props: action?.props || {},
      };
    });
  }

  static getAvailableTriggers() {
    const triggers = discord.triggers();
    return Object.keys(triggers).map((key) => {
      const trigger = triggers[key];
      return {
        name: key,
        displayName: trigger?.displayName || key,
        description: trigger?.description || "",
        props: trigger?.props || {},
      };
    });
  }
}
