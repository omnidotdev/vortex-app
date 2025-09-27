import { DiscordIntegrationService } from "./service";

export class DiscordClient {
  private service: DiscordIntegrationService;

  constructor(botToken: string) {
    this.service = new DiscordIntegrationService(botToken);
  }

  // Message operations
  async sendMessage(channelId: string, content: string, files?: any[]) {
    return this.service.sendMessage(channelId, content, files);
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
    return this.service.sendWebhookMessage(webhookUrl, content, options);
  }

  // Member management
  async addMemberRole(guildId: string, userId: string, roleId: string) {
    return this.service.addRole(guildId, userId, roleId);
  }

  async removeMemberRole(guildId: string, userId: string, roleId: string) {
    return this.service.removeRole(guildId, userId, roleId);
  }

  async banMember(guildId: string, userId: string, reason?: string) {
    return this.service.banMember(guildId, userId, reason);
  }

  async removeMember(guildId: string, userId: string) {
    return this.service.executeAction("remove_member_from_guild", {
      guild_id: guildId,
      user_id: userId,
    });
  }

  async listGuildMembers(guildId: string, search: string) {
    return this.service.executeAction("list_guild_members", {
      guild_id: guildId,
      shortText: search,
    });
  }

  // Channel management
  async createChannel(guildId: string, name: string) {
    return this.service.createChannel(guildId, name);
  }

  async renameChannel(channelId: string, name: string) {
    return this.service.executeAction("rename_channel", {
      channel_id: channelId,
      name,
    });
  }

  async deleteChannel(channelId: string) {
    return this.service.executeAction("delete_channel", {
      channel_id: channelId,
    });
  }

  async findChannel(guildId: string, name: string) {
    return this.service.executeAction("find_channel", {
      guild_id: guildId,
      name,
    });
  }

  // Role management
  async createRole(
    guildId: string,
    name: string,
    options?: {
      role_color?: string;
      display_separated?: boolean;
      role_mentionable?: boolean;
      creation_reason?: string;
    },
  ) {
    return this.service.createRole(guildId, name, options);
  }

  async deleteRole(guildId: string, roleId: string, reason?: string) {
    return this.service.executeAction("deleteGuildRole", {
      guild_id: guildId,
      role_id: roleId,
      deletion_reason: reason,
    });
  }

  // Moderation
  async unbanUser(guildId: string, userId: string, reason?: string) {
    return this.service.executeAction("remove_ban_from_user", {
      guild_id: guildId,
      user_id: userId,
      unban_reason: reason,
    });
  }

  async requestApproval(channelId: string, message: string) {
    return this.service.executeAction("request_approval_message", {
      channel: channelId,
      content: message,
    });
  }

  // Event listeners / triggers
  async onNewMessage(
    channelId: string,
    handler: (messages: any[]) => void,
    limit = 50,
  ) {
    const workflowHandle = await this.service.watchNewMessages(
      channelId,
      limit,
    );

    // Note: In a real implementation, you'd set up a webhook endpoint
    // to receive the trigger events and call the handler
    return workflowHandle;
  }

  async onNewMember(
    guildId: string,
    handler: (members: any[]) => void,
    limit = 50,
  ) {
    const workflowHandle = await this.service.watchNewMembers(guildId, limit);

    // Note: In a real implementation, you'd set up a webhook endpoint
    // to receive the trigger events and call the handler
    return workflowHandle;
  }

  // Polling triggers (for continuous monitoring)
  async startMessagePolling(
    channelId: string,
    intervalSeconds = 30,
    webhookUrl?: string,
  ) {
    const { getTemporalClient } = await import("../../temporal/client");
    const client = await getTemporalClient();

    return client.workflow.start("discordPollingWorkflow", {
      args: [
        {
          triggerName: "new_message",
          props: { channel: channelId, limit: 50 },
          auth: this.service["auth"],
          webhookUrl,
          intervalSeconds,
        },
      ],
      taskQueue: "vortex",
      workflowId: `discord-message-poll-${channelId}-${Date.now()}`,
    });
  }

  async startMemberPolling(
    guildId: string,
    intervalSeconds = 60,
    webhookUrl?: string,
  ) {
    const { getTemporalClient } = await import("../../temporal/client");
    const client = await getTemporalClient();

    return client.workflow.start("discordPollingWorkflow", {
      args: [
        {
          triggerName: "new_member",
          props: { guildId, limit: 50 },
          auth: this.service["auth"],
          webhookUrl,
          intervalSeconds,
        },
      ],
      taskQueue: "vortex",
      workflowId: `discord-member-poll-${guildId}-${Date.now()}`,
    });
  }

  // Utility methods
  static getAvailableActions() {
    return DiscordIntegrationService.getAvailableActions();
  }

  static getAvailableTriggers() {
    return DiscordIntegrationService.getAvailableTriggers();
  }
}

// Factory function for easy instantiation
export function createDiscordClient(botToken: string) {
  return new DiscordClient(botToken);
}
