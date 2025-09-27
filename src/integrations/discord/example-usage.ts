import { createDiscordClient } from './index';

// Example usage of the Discord integration with Temporal
export async function basicDiscordExample() {
  // Initialize Discord client with bot token from environment
  const discord = createDiscordClient(process.env.DISCORD_BOT_TOKEN!);

  try {
    // Send a message to a channel
    const messageResult = await discord.sendMessage(
      'your-channel-id',
      'Hello from Vortex with Temporal!'
    );
    console.log('Message sent:', messageResult);

    // Add a role to a member
    const roleResult = await discord.addMemberRole(
      'your-guild-id',
      'user-id',
      'role-id'
    );
    console.log('Role added:', roleResult);

    // Create a new channel
    const channelResult = await discord.createChannel(
      'your-guild-id',
      'temporal-bot-channel'
    );
    console.log('Channel created:', channelResult);

  } catch (error) {
    console.error('Discord operation failed:', error);
  }
}

// Example: Start monitoring for new messages
export async function startMessageMonitoring() {
  const discord = createDiscordClient(process.env.DISCORD_BOT_TOKEN!);

  // This will run as a Temporal workflow that polls for new messages
  const workflowHandle = await discord.startMessagePolling(
    'your-channel-id',
    30, // Check every 30 seconds
    'https://your-app.com/webhook/discord-messages' // Optional webhook URL
  );

  console.log('Message polling started:', workflowHandle.workflowId);
  return workflowHandle;
}

// Example: Batch operations
export async function batchDiscordOperations() {
  const discord = createDiscordClient(process.env.DISCORD_BOT_TOKEN!);

  const operations = [
    () => discord.sendMessage('channel-1', 'Batch message 1'),
    () => discord.sendMessage('channel-2', 'Batch message 2'),
    () => discord.createChannel('guild-id', 'temp-channel')
  ];

  // All operations will be executed as separate Temporal workflows
  const results = await Promise.allSettled(
    operations.map(op => op())
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Operation ${index} succeeded`);
    } else {
      console.error(`Operation ${index} failed:`, result.reason);
    }
  });

  return results;
}
