import { z } from 'zod';

// Configuration schemas
export const DiscordBotConfigSchema = z.object({
  botToken: z.string().min(1, 'Bot token is required'),
  guildId: z.string().optional(),
  applicationId: z.string().optional(),
  publicKey: z.string().optional(),
});

export const WelcomeConfigSchema = z.object({
  enabled: z.boolean().default(false),
  channelId: z.string().optional(),
  message: z.string().default('🎉 Welcome to the server, {username}! We\'re glad to have you here!'),
  assignRoles: z.array(z.string()).default([]),
  dmWelcome: z.boolean().default(false),
  dmMessage: z.string().optional(),
});

export const ModerationConfigSchema = z.object({
  enabled: z.boolean().default(false),
  autoDelete: z.boolean().default(false),
  warnOnViolation: z.boolean().default(true),
  banThreshold: z.number().default(3),
  muteRole: z.string().optional(),
  logChannel: z.string().optional(),
  filters: z.object({
    spam: z.boolean().default(true),
    profanity: z.boolean().default(true),
    links: z.boolean().default(false),
    mentions: z.boolean().default(false),
    caps: z.boolean().default(false),
  }).default({}),
});

export const EngagementConfigSchema = z.object({
  enabled: z.boolean().default(false),
  channelId: z.string().optional(),
  scheduledMessages: z.array(z.object({
    id: z.string(),
    content: z.string(),
    schedule: z.string(), // cron expression
    embeds: z.array(z.any()).optional(),
    enabled: z.boolean().default(true),
  })).default([]),
  reactionRoles: z.array(z.object({
    messageId: z.string(),
    emoji: z.string(),
    roleId: z.string(),
    description: z.string().optional(),
  })).default([]),
});

export const DiscordConfigSchema = z.object({
  bot: DiscordBotConfigSchema,
  welcome: WelcomeConfigSchema.default({}),
  moderation: ModerationConfigSchema.default({}),
  engagement: EngagementConfigSchema.default({}),
  webhooks: z.object({
    enabled: z.boolean().default(false),
    url: z.string().optional(),
    secret: z.string().optional(),
    events: z.array(z.string()).default(['message', 'member_join', 'member_leave']),
  }).default({}),
  temporal: z.object({
    taskQueue: z.string().default('vortex'),
    namespace: z.string().default('default'),
    workflowTimeout: z.string().default('1 hour'),
    retryPolicy: z.object({
      initialInterval: z.string().default('1s'),
      backoffCoefficient: z.number().default(2.0),
      maximumInterval: z.string().default('100s'),
      maximumAttempts: z.number().default(3),
    }).default({}),
  }).default({}),
});

export type DiscordConfig = z.infer<typeof DiscordConfigSchema>;
export type WelcomeConfig = z.infer<typeof WelcomeConfigSchema>;
export type ModerationConfig = z.infer<typeof ModerationConfigSchema>;
export type EngagementConfig = z.infer<typeof EngagementConfigSchema>;

// Default configuration
export const DEFAULT_DISCORD_CONFIG: DiscordConfig = {
  bot: {
    botToken: '',
  },
  welcome: {
    enabled: false,
    message: '🎉 Welcome to the server, {username}! We\'re glad to have you here!',
    assignRoles: [],
    dmWelcome: false,
  },
  moderation: {
    enabled: false,
    autoDelete: false,
    warnOnViolation: true,
    banThreshold: 3,
    filters: {
      spam: true,
      profanity: true,
      links: false,
      mentions: false,
      caps: false,
    },
  },
  engagement: {
    enabled: false,
    scheduledMessages: [],
    reactionRoles: [],
  },
  webhooks: {
    enabled: false,
    events: ['message', 'member_join', 'member_leave'],
  },
  temporal: {
    taskQueue: 'vortex',
    namespace: 'default',
    workflowTimeout: '1 hour',
    retryPolicy: {
      initialInterval: '1s',
      backoffCoefficient: 2.0,
      maximumInterval: '100s',
      maximumAttempts: 3,
    },
  },
};

// Configuration manager class
export class DiscordConfigManager {
  private config: DiscordConfig = DEFAULT_DISCORD_CONFIG;
  private listeners: Array<(config: DiscordConfig) => void> = [];

  constructor(initialConfig?: Partial<DiscordConfig>) {
    if (initialConfig) {
      this.updateConfig(initialConfig);
    }
  }

  getConfig(): DiscordConfig {
    return { ...this.config };
  }

  getBotConfig() {
    return this.config.bot;
  }

  getWelcomeConfig() {
    return this.config.welcome;
  }

  getModerationConfig() {
    return this.config.moderation;
  }

  getEngagementConfig() {
    return this.config.engagement;
  }

  getWebhookConfig() {
    return this.config.webhooks;
  }

  getTemporalConfig() {
    return this.config.temporal;
  }

  updateConfig(updates: Partial<DiscordConfig>) {
    try {
      const newConfig = { ...this.config, ...updates };
      const validatedConfig = DiscordConfigSchema.parse(newConfig);
      this.config = validatedConfig;
      this.notifyListeners();
    } catch (error) {
      console.error('Invalid Discord configuration:', error);
      throw error;
    }
  }

  updateBotConfig(updates: Partial<DiscordConfig['bot']>) {
    this.updateConfig({
      bot: { ...this.config.bot, ...updates }
    });
  }

  updateWelcomeConfig(updates: Partial<WelcomeConfig>) {
    this.updateConfig({
      welcome: { ...this.config.welcome, ...updates }
    });
  }

  updateModerationConfig(updates: Partial<ModerationConfig>) {
    this.updateConfig({
      moderation: { ...this.config.moderation, ...updates }
    });
  }

  updateEngagementConfig(updates: Partial<EngagementConfig>) {
    this.updateConfig({
      engagement: { ...this.config.engagement, ...updates }
    });
  }

  // Validation helpers
  validateBotToken(token: string): boolean {
    return token.length > 0 && /^[A-Za-z0-9._-]+$/.test(token);
  }

  validateChannelId(channelId: string): boolean {
    return /^\d{17,19}$/.test(channelId);
  }

  validateRoleId(roleId: string): boolean {
    return /^\d{17,19}$/.test(roleId);
  }

  validateGuildId(guildId: string): boolean {
    return /^\d{17,19}$/.test(guildId);
  }

  // Event listeners
  onConfigChange(listener: (config: DiscordConfig) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.config);
      } catch (error) {
        console.error('Error in config change listener:', error);
      }
    });
  }

  // Serialization
  toJSON() {
    return JSON.stringify(this.config, null, 2);
  }

  fromJSON(json: string) {
    try {
      const parsed = JSON.parse(json);
      const validated = DiscordConfigSchema.parse(parsed);
      this.config = validated;
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to load configuration from JSON:', error);
      throw error;
    }
  }

  // Environment variable integration
  loadFromEnv() {
    const envConfig: Partial<DiscordConfig> = {};

    if (process.env.DISCORD_BOT_TOKEN) {
      envConfig.bot = {
        botToken: process.env.DISCORD_BOT_TOKEN,
        guildId: process.env.DISCORD_GUILD_ID,
        applicationId: process.env.DISCORD_APPLICATION_ID,
        publicKey: process.env.DISCORD_PUBLIC_KEY,
      };
    }

    if (process.env.DISCORD_WELCOME_CHANNEL_ID) {
      envConfig.welcome = {
        enabled: process.env.DISCORD_WELCOME_ENABLED === 'true',
        channelId: process.env.DISCORD_WELCOME_CHANNEL_ID,
        message: process.env.DISCORD_WELCOME_MESSAGE || DEFAULT_DISCORD_CONFIG.welcome.message,
        assignRoles: process.env.DISCORD_DEFAULT_ROLES?.split(',') || [],
        dmWelcome: process.env.DISCORD_WELCOME_DM === 'true',
        dmMessage: process.env.DISCORD_WELCOME_DM_MESSAGE,
      };
    }

    if (process.env.DISCORD_MODERATION_ENABLED === 'true') {
      envConfig.moderation = {
        enabled: true,
        logChannel: process.env.DISCORD_MOD_LOG_CHANNEL,
        muteRole: process.env.DISCORD_MUTE_ROLE,
        autoDelete: process.env.DISCORD_AUTO_DELETE === 'true',
        warnOnViolation: process.env.DISCORD_WARN_ON_VIOLATION !== 'false',
        banThreshold: parseInt(process.env.DISCORD_BAN_THRESHOLD || '3'),
        filters: {
          spam: process.env.DISCORD_FILTER_SPAM !== 'false',
          profanity: process.env.DISCORD_FILTER_PROFANITY !== 'false',
          links: process.env.DISCORD_FILTER_LINKS === 'true',
          mentions: process.env.DISCORD_FILTER_MENTIONS === 'true',
          caps: process.env.DISCORD_FILTER_CAPS === 'true',
        },
      };
    }

    if (process.env.DISCORD_WEBHOOK_URL) {
      envConfig.webhooks = {
        enabled: true,
        url: process.env.DISCORD_WEBHOOK_URL,
        secret: process.env.DISCORD_WEBHOOK_SECRET,
        events: process.env.DISCORD_WEBHOOK_EVENTS?.split(',') ||
                DEFAULT_DISCORD_CONFIG.webhooks.events,
      };
    }

    if (Object.keys(envConfig).length > 0) {
      this.updateConfig(envConfig);
    }
  }

  // Export configuration for other services
  getServiceConfigs() {
    return {
      temporal: {
        taskQueue: this.config.temporal.taskQueue,
        namespace: this.config.temporal.namespace,
        workflowTimeout: this.config.temporal.workflowTimeout,
        retryPolicy: this.config.temporal.retryPolicy,
      },
      discord: {
        botToken: this.config.bot.botToken,
        guildId: this.config.bot.guildId,
      },
      features: {
        welcome: this.config.welcome.enabled,
        moderation: this.config.moderation.enabled,
        engagement: this.config.engagement.enabled,
        webhooks: this.config.webhooks.enabled,
      },
    };
  }
}

// Global instance
export const discordConfig = new DiscordConfigManager();

// Initialize from environment variables
try {
  discordConfig.loadFromEnv();
} catch (error) {
  console.warn('Failed to load Discord configuration from environment:', error);
}
