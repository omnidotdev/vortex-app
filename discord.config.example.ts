// Discord Integration Configuration Example
// Copy this file to discord.config.ts and update with your actual values

import { DiscordConfig } from './src/integrations/discord/config';

export const discordConfig: DiscordConfig = {
  // Discord Bot Configuration
  bot: {
    // Your Discord bot token from https://discord.com/developers/applications
    botToken: 'your_bot_token_here',

    // Optional: Specific guild (server) ID to restrict bot operations
    guildId: 'your_guild_id_here',

    // Optional: Discord application ID
    applicationId: 'your_application_id_here',

    // Optional: Public key for interaction verification
    publicKey: 'your_public_key_here',
  },

  // Welcome System Configuration
  welcome: {
    enabled: true,

    // Channel ID where welcome messages will be sent
    channelId: 'your_welcome_channel_id',

    // Welcome message template ({username} will be replaced with actual username)
    message: '🎉 Welcome to the server, {username}! We\'re glad to have you here!\n\n' +
             'Please read our rules in #rules and introduce yourself in #introductions.',

    // Array of role IDs to automatically assign to new members
    assignRoles: [
      'role_id_1', // e.g., "Member" role
      'role_id_2', // e.g., "New User" role
    ],

    // Send welcome message via DM
    dmWelcome: false,

    // DM welcome message (only used if dmWelcome is true)
    dmMessage: 'Welcome to our Discord server! Feel free to ask questions in any channel.',
  },

  // Moderation System Configuration
  moderation: {
    enabled: true,

    // Automatically delete messages that violate rules
    autoDelete: true,

    // Send warning messages to users who violate rules
    warnOnViolation: true,

    // Number of violations before automatic ban
    banThreshold: 3,

    // Role ID for muted users
    muteRole: 'your_mute_role_id',

    // Channel ID for moderation logs
    logChannel: 'your_mod_log_channel_id',

    // Content filters
    filters: {
      spam: true,      // Detect spam messages
      profanity: true, // Filter profanity
      links: false,    // Filter external links
      mentions: false, // Limit excessive mentions
      caps: true,      // Limit excessive caps
    },
  },

  // Engagement & Automation Configuration
  engagement: {
    enabled: true,

    // Default channel for engagement content
    channelId: 'your_engagement_channel_id',

    // Scheduled messages (using cron expressions)
    scheduledMessages: [
      {
        id: 'daily_reminder',
        content: '📅 Don\'t forget to check out today\'s events in #announcements!',
        schedule: '0 9 * * *', // Daily at 9 AM
        enabled: true,
      },
      {
        id: 'weekly_poll',
        content: '🗳️ Weekly community poll is live!',
        schedule: '0 12 * * 1', // Mondays at 12 PM
        embeds: [
          {
            title: 'Community Poll',
            description: 'Help us improve the server!',
            color: 0x5865F2,
          }
        ],
        enabled: true,
      },
    ],

    // Reaction role mappings
    reactionRoles: [
      {
        messageId: 'your_role_selection_message_id',
        emoji: '🎮',
        roleId: 'gaming_role_id',
        description: 'Gaming enthusiast role',
      },
      {
        messageId: 'your_role_selection_message_id',
        emoji: '💻',
        roleId: 'developer_role_id',
        description: 'Developer role',
      },
      {
        messageId: 'your_role_selection_message_id',
        emoji: '🎨',
        roleId: 'artist_role_id',
        description: 'Artist role',
      },
    ],
  },

  // Webhook Configuration
  webhooks: {
    enabled: true,

    // External webhook URL for event notifications
    url: 'https://your-app.com/api/webhooks/discord',

    // Optional: Secret for webhook verification
    secret: 'your_webhook_secret',

    // Discord events to listen for
    events: [
      'message',
      'member_join',
      'member_leave',
      'reaction_add',
      'reaction_remove',
      'voice_state_update',
    ],
  },

  // Temporal Workflow Configuration
  temporal: {
    // Task queue name for Discord workflows
    taskQueue: 'discord-workflows',

    // Temporal namespace
    namespace: 'default',

    // Default workflow timeout
    workflowTimeout: '10 minutes',

    // Retry policy for failed activities
    retryPolicy: {
      initialInterval: '1s',
      backoffCoefficient: 2.0,
      maximumInterval: '30s',
      maximumAttempts: 5,
    },
  },
};

// Environment-specific overrides
export const developmentConfig: Partial<DiscordConfig> = {
  temporal: {
    taskQueue: 'discord-workflows-dev',
    workflowTimeout: '5 minutes',
  },
  moderation: {
    enabled: false, // Disable moderation in development
  },
  webhooks: {
    enabled: false, // Disable webhooks in development
  },
};

export const productionConfig: Partial<DiscordConfig> = {
  moderation: {
    autoDelete: true,
    banThreshold: 2, // Stricter in production
  },
  temporal: {
    retryPolicy: {
      maximumAttempts: 10, // More retries in production
    },
  },
};

// Usage examples:

// 1. Custom automation workflow
export const customAutomationExample = {
  type: 'custom' as const,
  config: {
    steps: [
      {
        action: 'sendMessageWithBot',
        params: {
          channel_id: 'your_channel_id',
          message: 'Starting custom automation...',
        },
        delay: '5s',
      },
      {
        action: 'add_role_to_member',
        params: {
          guild_id: 'your_guild_id',
          user_id: 'target_user_id',
          role_id: 'special_role_id',
        },
      },
    ],
    followUp: {
      delay: '1 hour',
      action: 'sendMessageWithBot',
      params: {
        channel_id: 'your_channel_id',
        message: 'Automation completed successfully!',
      },
    },
  },
};

// 2. Advanced welcome sequence
export const welcomeSequenceExample = {
  type: 'welcome_sequence' as const,
  config: {
    welcomeChannelId: 'your_welcome_channel_id',
    welcomeMessage: '🎉 Welcome {username}! Let\'s get you set up.',
    assignRoles: ['member_role_id', 'new_user_role_id'],
    userId: 'new_member_user_id',
    followUp: {
      delay: '24 hours',
      action: 'sendMessageWithBot',
      params: {
        channel_id: 'your_welcome_channel_id',
        message: 'How are you settling in, {username}? Need any help?',
      },
    },
  },
};

// 3. Moderation automation
export const moderationExample = {
  type: 'moderation' as const,
  config: {
    conditions: [
      { type: 'message_count', threshold: 5, timeWindow: '1 minute' },
      { type: 'contains_spam', confidence: 0.8 },
    ],
    action: 'ban_guild_member',
    params: {
      guild_id: 'your_guild_id',
      user_id: 'target_user_id',
      ban_reason: 'Automated moderation: spam detected',
    },
  },
};

// 4. Engagement campaign
export const engagementExample = {
  type: 'engagement' as const,
  config: {
    channelId: 'your_general_channel_id',
    content: '🎉 Weekly community event starting now!',
    embeds: [
      {
        title: 'Community Event',
        description: 'Join us for games, discussions, and prizes!',
        color: 0x00FF00,
        fields: [
          {
            name: 'Duration',
            value: '2 hours',
            inline: true,
          },
          {
            name: 'Prizes',
            value: 'Discord Nitro & Special Roles',
            inline: true,
          },
        ],
        footer: {
          text: 'React with 🎮 to participate!',
        },
      },
    ],
  },
};
