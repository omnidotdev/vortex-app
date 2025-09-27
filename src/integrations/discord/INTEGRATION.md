# Discord Integration with Temporal

This integration connects the `@activepieces/piece-discord` package with Temporal workflows for robust job execution and orchestration.

## What's Been Built

### Core Components

1. **DiscordIntegrationService** (`service.ts`)
   - Main service class that wraps Discord piece functionality
   - Executes Discord actions and triggers through Temporal workflows
   - Provides direct execution methods for immediate use

2. **DiscordClient** (`client.ts`)
   - High-level client with convenient methods
   - Wraps common Discord operations (messages, roles, channels, etc.)
   - Supports both one-time actions and continuous polling

3. **Temporal Integration** (`../temporal/`)
   - Updated workflows for Discord action and trigger execution
   - Activities for processing Discord events
   - Polling workflow for continuous monitoring

## Available Discord Actions

- **Messages**: Send messages, webhook messages, request approval
- **Members**: Add/remove roles, ban/unban, list members, remove from guild
- **Channels**: Create, rename, delete, find channels
- **Roles**: Create, delete guild roles
- **Custom**: Custom API calls to Discord endpoints

## Available Discord Triggers

- **new_message**: Triggers when messages are sent in a channel
- **new_member**: Triggers when new members join a guild

## Usage Examples

### Basic Message Sending
```typescript
import { createDiscordClient } from './integrations/discord';

const discord = createDiscordClient(process.env.DISCORD_BOT_TOKEN!);

// Send a message (executed via Temporal workflow)
await discord.sendMessage('channel-id', 'Hello from Temporal!');
```

### Continuous Monitoring
```typescript
// Start polling for new messages every 30 seconds
await discord.startMessagePolling(
  'channel-id',
  30,
  'https://your-app.com/webhook/discord-messages'
);
```

### Batch Operations
```typescript
const operations = [
  () => discord.sendMessage('channel-1', 'Message 1'),
  () => discord.addMemberRole('guild-id', 'user-id', 'role-id'),
  () => discord.createChannel('guild-id', 'new-channel')
];

const results = await Promise.allSettled(
  operations.map(op => op())
);
```

## Key Benefits

1. **Reliability**: All Discord operations are executed through Temporal workflows, providing:
   - Automatic retries on failure
   - Durable execution (survives process restarts)
   - Workflow visibility and debugging

2. **Scalability**: Temporal handles job distribution and scaling automatically

3. **Flexibility**: Can use Discord piece APIs directly or through Temporal workflows

4. **Monitoring**: Built-in polling workflows for continuous Discord event monitoring

## Environment Setup

Set your Discord bot token:
```bash
export DISCORD_BOT_TOKEN=your_bot_token_here
```

## Temporal Workflows

- `discordActionWorkflow`: Executes single Discord actions
- `discordTriggerWorkflow`: Runs Discord triggers once
- `discordPollingWorkflow`: Continuously polls Discord for events

All workflows run on the 'vortex' task queue and can be monitored through the Temporal UI.

## Error Handling

The integration includes comprehensive error handling:
- Failed operations return `{ success: false, error: "..." }`
- Temporal provides automatic retries and failure recovery
- Webhook endpoints receive error notifications

This integration gives you the full power of Discord's API with Temporal's reliability and orchestration capabilities.