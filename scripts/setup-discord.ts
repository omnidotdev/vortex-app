#!/usr/bin/env tsx

/**
 * Discord Integration Setup Script
 *
 * This script helps initialize and configure the Discord integration
 * for the Vortex application with Temporal workflows.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { discordConfig, DiscordConfigManager } from '../src/integrations/discord/config';
import { getTemporalClient } from '../src/temporal/client';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

function log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    error: '\x1b[31m',   // Red
    warn: '\x1b[33m'     // Yellow
  };
  const reset = '\x1b[0m';
  console.log(`${colors[type]}[${type.toUpperCase()}]${reset} ${message}`);
}

async function validateDiscordToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bot ${token}`,
        'User-Agent': 'Vortex Discord Integration (Setup Script)'
      }
    });

    if (response.ok) {
      const data = await response.json();
      log(`✓ Connected as ${data.username}#${data.discriminator}`, 'success');
      return true;
    } else {
      log(`✗ Failed to validate token: ${response.status} ${response.statusText}`, 'error');
      return false;
    }
  } catch (error) {
    log(`✗ Error validating token: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    return false;
  }
}

async function testTemporalConnection(): Promise<boolean> {
  try {
    const client = await getTemporalClient();
    const handle = await client.workflow.start('testWorkflow', {
      args: [{ test: true }],
      taskQueue: 'vortex',
      workflowId: `setup-test-${Date.now()}`,
    });

    log('✓ Temporal connection successful', 'success');
    return true;
  } catch (error) {
    log(`✗ Temporal connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    return false;
  }
}

async function setupBotConfiguration() {
  log('\n=== Discord Bot Configuration ===', 'info');

  const token = await question('Enter your Discord bot token: ');
  if (!token.trim()) {
    log('Bot token is required', 'error');
    return false;
  }

  log('Validating Discord bot token...', 'info');
  const isValid = await validateDiscordToken(token);
  if (!isValid) {
    return false;
  }

  const guildId = await question('Enter your Discord server (guild) ID (optional): ');
  const applicationId = await question('Enter your Discord application ID (optional): ');

  discordConfig.updateBotConfig({
    botToken: token,
    guildId: guildId.trim() || undefined,
    applicationId: applicationId.trim() || undefined,
  });

  return true;
}

async function setupWelcomeSystem() {
  log('\n=== Welcome System Configuration ===', 'info');

  const enabled = await question('Enable welcome system? (y/n): ');
  if (enabled.toLowerCase() !== 'y') {
    discordConfig.updateWelcomeConfig({ enabled: false });
    return;
  }

  const channelId = await question('Enter welcome channel ID: ');
  const message = await question('Enter welcome message template (use {username} for username): ')
    || '🎉 Welcome to the server, {username}! We\'re glad to have you here!';

  const rolesInput = await question('Enter default role IDs (comma-separated, optional): ');
  const roles = rolesInput ? rolesInput.split(',').map(r => r.trim()).filter(Boolean) : [];

  const dmWelcome = await question('Send welcome DM? (y/n): ');
  let dmMessage = '';
  if (dmWelcome.toLowerCase() === 'y') {
    dmMessage = await question('Enter DM welcome message: ')
      || 'Welcome to our Discord server! Feel free to ask questions in any channel.';
  }

  discordConfig.updateWelcomeConfig({
    enabled: true,
    channelId: channelId.trim() || undefined,
    message,
    assignRoles: roles,
    dmWelcome: dmWelcome.toLowerCase() === 'y',
    dmMessage: dmMessage || undefined,
  });

  log('✓ Welcome system configured', 'success');
}

async function setupModerationSystem() {
  log('\n=== Moderation System Configuration ===', 'info');

  const enabled = await question('Enable moderation system? (y/n): ');
  if (enabled.toLowerCase() !== 'y') {
    discordConfig.updateModerationConfig({ enabled: false });
    return;
  }

  const autoDelete = await question('Auto-delete violating messages? (y/n): ');
  const warnOnViolation = await question('Send warnings for violations? (y/n): ');
  const banThreshold = await question('Ban threshold (number of violations): ') || '3';
  const muteRole = await question('Mute role ID (optional): ');
  const logChannel = await question('Moderation log channel ID (optional): ');

  log('Configure content filters:', 'info');
  const spam = await question('  Filter spam? (y/n): ');
  const profanity = await question('  Filter profanity? (y/n): ');
  const links = await question('  Filter external links? (y/n): ');
  const mentions = await question('  Limit excessive mentions? (y/n): ');
  const caps = await question('  Limit excessive caps? (y/n): ');

  discordConfig.updateModerationConfig({
    enabled: true,
    autoDelete: autoDelete.toLowerCase() === 'y',
    warnOnViolation: warnOnViolation.toLowerCase() !== 'n',
    banThreshold: parseInt(banThreshold) || 3,
    muteRole: muteRole.trim() || undefined,
    logChannel: logChannel.trim() || undefined,
    filters: {
      spam: spam.toLowerCase() === 'y',
      profanity: profanity.toLowerCase() === 'y',
      links: links.toLowerCase() === 'y',
      mentions: mentions.toLowerCase() === 'y',
      caps: caps.toLowerCase() === 'y',
    },
  });

  log('✓ Moderation system configured', 'success');
}

async function setupEngagementSystem() {
  log('\n=== Engagement System Configuration ===', 'info');

  const enabled = await question('Enable engagement system? (y/n): ');
  if (enabled.toLowerCase() !== 'y') {
    discordConfig.updateEngagementConfig({ enabled: false });
    return;
  }

  const channelId = await question('Enter default engagement channel ID: ');

  discordConfig.updateEngagementConfig({
    enabled: true,
    channelId: channelId.trim() || undefined,
    scheduledMessages: [],
    reactionRoles: [],
  });

  log('✓ Engagement system configured', 'success');
  log('  Note: Scheduled messages and reaction roles can be configured later via the dashboard', 'info');
}

async function setupWebhooks() {
  log('\n=== Webhook Configuration ===', 'info');

  const enabled = await question('Enable webhook integration? (y/n): ');
  if (enabled.toLowerCase() !== 'y') {
    return;
  }

  const url = await question('Enter webhook URL (leave empty for default): ')
    || 'http://localhost:3000/api/webhooks/discord';
  const secret = await question('Enter webhook secret (optional): ');

  discordConfig.updateConfig({
    webhooks: {
      enabled: true,
      url,
      secret: secret.trim() || undefined,
      events: ['message', 'member_join', 'member_leave', 'reaction_add'],
    },
  });

  log('✓ Webhook configuration saved', 'success');
}

async function generateEnvFile() {
  const config = discordConfig.getConfig();
  const envPath = join(process.cwd(), '.env.local');

  let envContent = '';
  if (existsSync(envPath)) {
    envContent = readFileSync(envPath, 'utf8');
  }

  // Remove existing Discord configuration
  envContent = envContent.replace(/# Discord Configuration[\s\S]*?(?=\n# |$)/g, '').trim();

  const discordEnv = `
# Discord Configuration (Generated by setup script)
DISCORD_BOT_TOKEN="${config.bot.botToken}"
${config.bot.guildId ? `DISCORD_GUILD_ID="${config.bot.guildId}"` : '# DISCORD_GUILD_ID=""'}
${config.bot.applicationId ? `DISCORD_APPLICATION_ID="${config.bot.applicationId}"` : '# DISCORD_APPLICATION_ID=""'}

# Welcome System
DISCORD_WELCOME_ENABLED="${config.welcome.enabled}"
${config.welcome.channelId ? `DISCORD_WELCOME_CHANNEL_ID="${config.welcome.channelId}"` : '# DISCORD_WELCOME_CHANNEL_ID=""'}
DISCORD_WELCOME_MESSAGE="${config.welcome.message}"
${config.welcome.assignRoles.length > 0 ? `DISCORD_DEFAULT_ROLES="${config.welcome.assignRoles.join(',')}"` : '# DISCORD_DEFAULT_ROLES=""'}
DISCORD_WELCOME_DM="${config.welcome.dmWelcome}"
${config.welcome.dmMessage ? `DISCORD_WELCOME_DM_MESSAGE="${config.welcome.dmMessage}"` : '# DISCORD_WELCOME_DM_MESSAGE=""'}

# Moderation System
DISCORD_MODERATION_ENABLED="${config.moderation.enabled}"
${config.moderation.logChannel ? `DISCORD_MOD_LOG_CHANNEL="${config.moderation.logChannel}"` : '# DISCORD_MOD_LOG_CHANNEL=""'}
${config.moderation.muteRole ? `DISCORD_MUTE_ROLE="${config.moderation.muteRole}"` : '# DISCORD_MUTE_ROLE=""'}
DISCORD_AUTO_DELETE="${config.moderation.autoDelete}"
DISCORD_WARN_ON_VIOLATION="${config.moderation.warnOnViolation}"
DISCORD_BAN_THRESHOLD="${config.moderation.banThreshold}"

# Content Filters
DISCORD_FILTER_SPAM="${config.moderation.filters.spam}"
DISCORD_FILTER_PROFANITY="${config.moderation.filters.profanity}"
DISCORD_FILTER_LINKS="${config.moderation.filters.links}"
DISCORD_FILTER_MENTIONS="${config.moderation.filters.mentions}"
DISCORD_FILTER_CAPS="${config.moderation.filters.caps}"

# Webhooks
${config.webhooks.enabled ? `DISCORD_WEBHOOK_URL="${config.webhooks.url}"` : '# DISCORD_WEBHOOK_URL=""'}
${config.webhooks.secret ? `DISCORD_WEBHOOK_SECRET="${config.webhooks.secret}"` : '# DISCORD_WEBHOOK_SECRET=""'}
${config.webhooks.enabled ? `DISCORD_WEBHOOK_EVENTS="${config.webhooks.events.join(',')}"` : '# DISCORD_WEBHOOK_EVENTS=""'}
`;

  const finalContent = envContent + '\n' + discordEnv;
  writeFileSync(envPath, finalContent);

  log(`✓ Environment configuration saved to ${envPath}`, 'success');
}

async function saveConfiguration() {
  const configPath = join(process.cwd(), 'discord.config.json');
  const config = discordConfig.getConfig();

  // Remove sensitive data from saved config
  const safeConfig = {
    ...config,
    bot: {
      ...config.bot,
      botToken: '[REDACTED - See .env.local]',
    },
  };

  writeFileSync(configPath, JSON.stringify(safeConfig, null, 2));
  log(`✓ Configuration saved to ${configPath}`, 'success');
}

async function displayNextSteps() {
  log('\n=== Setup Complete! ===', 'success');
  log('Your Discord integration has been configured. Next steps:', 'info');
  log('', 'info');
  log('1. Start the Temporal server:', 'info');
  log('   npm run temporal:server', 'warn');
  log('', 'info');
  log('2. Start the Temporal worker:', 'info');
  log('   npm run worker:dev', 'warn');
  log('', 'info');
  log('3. Start the development server:', 'info');
  log('   npm run dev', 'warn');
  log('', 'info');
  log('4. Visit the Discord dashboard:', 'info');
  log('   http://localhost:3000/discord', 'warn');
  log('', 'info');
  log('5. Test your integration:', 'info');
  log('   - Send a test message from the dashboard', 'info');
  log('   - Invite new members to test welcome system', 'info');
  log('   - Monitor workflows in Temporal UI (http://localhost:8080)', 'info');
  log('', 'info');
  log('Configuration files created:', 'info');
  log('  - .env.local (environment variables)', 'info');
  log('  - discord.config.json (configuration backup)', 'info');
}

async function main() {
  log('🤖 Discord Integration Setup for Vortex', 'info');
  log('This script will help you configure Discord + Temporal integration', 'info');

  try {
    // Test Temporal connection first
    log('\nTesting Temporal connection...', 'info');
    const temporalOk = await testTemporalConnection();
    if (!temporalOk) {
      log('Please ensure Temporal server is running: npm run temporal:server', 'warn');
      const continueAnyway = await question('Continue setup anyway? (y/n): ');
      if (continueAnyway.toLowerCase() !== 'y') {
        process.exit(1);
      }
    }

    // Configure Discord bot
    const botConfigured = await setupBotConfiguration();
    if (!botConfigured) {
      log('Bot configuration failed. Exiting.', 'error');
      process.exit(1);
    }

    // Configure systems
    await setupWelcomeSystem();
    await setupModerationSystem();
    await setupEngagementSystem();
    await setupWebhooks();

    // Save configuration
    await generateEnvFile();
    await saveConfiguration();

    // Display next steps
    await displayNextSteps();

  } catch (error) {
    log(`Setup failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('\nSetup interrupted by user', 'warn');
  rl.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('\nSetup terminated', 'warn');
  rl.close();
  process.exit(0);
});

// Run the setup
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { main as setupDiscordIntegration };
