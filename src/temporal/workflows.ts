import * as wf from "@temporalio/workflow";

// Test workflow to verify Temporal is working
export async function testWorkflow(input: { test: boolean }) {
  console.log(
    "🧪 [TEMPORAL WORKFLOW] Test workflow started with input:",
    input,
  );

  // Sleep for a bit so you can see it in the UI
  await wf.sleep("5 seconds");

  console.log("✅ [TEMPORAL WORKFLOW] Test workflow completing...");
  return {
    success: true,
    message: "Test workflow completed successfully!",
    timestamp: new Date().toISOString(),
  };
}

// Long-running test workflow to see in UI
export async function longRunningTestWorkflow() {
  console.log("🔄 [TEMPORAL WORKFLOW] Long-running test workflow started");

  for (let i = 1; i <= 10; i++) {
    console.log(
      `🔄 [TEMPORAL WORKFLOW] Step ${i}/10: Sleeping for 10 seconds...`,
    );
    await wf.sleep("10 seconds");
  }

  console.log("✅ [TEMPORAL WORKFLOW] Long-running test workflow completed");
  return { success: true, steps: 10 };
}

// Simple test workflow with proper Temporal signature
export async function simpleTestWorkflow(input: { message: string }) {
  console.log(
    "🧪 [TEMPORAL WORKFLOW] Simple test workflow started:",
    input.message,
  );

  // Just sleep and return - no activities
  await wf.sleep("2 seconds");

  console.log("✅ [TEMPORAL WORKFLOW] Simple test workflow completed");
  return { success: true, message: "Simple test completed", input };
}

export async function sendEmailWorkflow(
  to: string,
  subject: string,
  content: string,
) {
  console.log("📧 [TEMPORAL WORKFLOW] Email workflow started", { to, subject });
  // This is where we'll implement the actual workflow logic
  // The workflow coordinates email sending through activities
  await wf.sleep("1 second");
  console.log("📧 [TEMPORAL WORKFLOW] Email workflow completed");
  return { success: true };
}

export async function discordActionWorkflow(input: {
  actionName: string;
  props: any;
  auth: string;
}) {
  console.log(
    `🤖 [TEMPORAL WORKFLOW] Discord action workflow started: ${input.actionName}`,
  );
  console.log(
    `📋 [TEMPORAL WORKFLOW] Input props:`,
    JSON.stringify(input.props, null, 2),
  );

  const { executeDiscordAction } = wf.proxyActivities<{
    executeDiscordAction: (
      actionName: string,
      props: any,
      auth: string,
    ) => Promise<any>;
  }>({
    startToCloseTimeout: "1 minute",
  });

  try {
    const result = await executeDiscordAction(
      input.actionName,
      input.props,
      input.auth,
    );

    console.log(
      `✅ [TEMPORAL WORKFLOW] Discord action workflow completed successfully`,
    );
    return result;
  } catch (error) {
    console.error(
      `❌ [TEMPORAL WORKFLOW] Discord action workflow failed:`,
      error,
    );
    throw error;
  }
}

export async function discordTriggerWorkflow(input: {
  triggerName: string;
  props: any;
  auth: string;
  webhookUrl?: string;
}) {
  console.log(
    `🎯 [TEMPORAL WORKFLOW] Discord trigger workflow started: ${input.triggerName}`,
  );
  console.log(
    `📋 [TEMPORAL WORKFLOW] Trigger props:`,
    JSON.stringify(input.props, null, 2),
  );

  const { executeDiscordTrigger, processDiscordEvent } = wf.proxyActivities<{
    executeDiscordTrigger: (
      triggerName: string,
      props: any,
      auth: string,
    ) => Promise<any>;
    processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
  }>({
    startToCloseTimeout: "5 minutes",
  });

  try {
    // Execute the trigger to get initial data
    const triggerResult = await executeDiscordTrigger(
      input.triggerName,
      input.props,
      input.auth,
    );

    if (triggerResult.success && triggerResult.data) {
      // Process each event from the trigger
      const events = Array.isArray(triggerResult.data)
        ? triggerResult.data
        : [triggerResult.data];

      console.log(
        `🔄 [TEMPORAL WORKFLOW] Processing ${events.length} Discord events`,
      );

      for (const event of events) {
        await processDiscordEvent(event, input.webhookUrl);
        // Small delay between processing events
        await wf.sleep("100ms");
      }
    }

    console.log(`✅ [TEMPORAL WORKFLOW] Discord trigger workflow completed`);
    return triggerResult;
  } catch (error) {
    console.error(
      `❌ [TEMPORAL WORKFLOW] Discord trigger workflow failed:`,
      error,
    );
    throw error;
  }
}

export async function discordPollingWorkflow(input: {
  triggerName: string;
  props: any;
  auth: string;
  webhookUrl?: string;
  intervalSeconds: number;
}) {
  console.log(
    `🔄 [TEMPORAL WORKFLOW] Discord polling workflow started: ${input.triggerName}`,
  );
  console.log(
    `⏰ [TEMPORAL WORKFLOW] Polling interval: ${input.intervalSeconds}s`,
  );

  const { executeDiscordTrigger, processDiscordEvent } = wf.proxyActivities<{
    executeDiscordTrigger: (
      triggerName: string,
      props: any,
      auth: string,
    ) => Promise<any>;
    processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
  }>({
    startToCloseTimeout: "5 minutes",
  });

  let iteration = 0;

  // Polling loop - runs indefinitely until cancelled
  while (true) {
    iteration++;
    console.log(
      `🔄 [TEMPORAL WORKFLOW] Polling iteration ${iteration} for ${input.triggerName}`,
    );

    try {
      const triggerResult = await executeDiscordTrigger(
        input.triggerName,
        input.props,
        input.auth,
      );

      if (triggerResult.success && triggerResult.data) {
        const events = Array.isArray(triggerResult.data)
          ? triggerResult.data
          : [triggerResult.data];

        if (events.length > 0) {
          console.log(
            `📨 [TEMPORAL WORKFLOW] Found ${events.length} new events in iteration ${iteration}`,
          );
        }

        for (const event of events) {
          await processDiscordEvent(event, input.webhookUrl);
          await wf.sleep("100ms");
        }
      }
    } catch (error) {
      console.error(
        `❌ [TEMPORAL WORKFLOW] Discord polling iteration ${iteration} failed:`,
        error,
      );
      // Continue polling even if one iteration fails
    }

    // Wait for the specified interval before next poll
    console.log(
      `💤 [TEMPORAL WORKFLOW] Sleeping for ${input.intervalSeconds}s before next poll`,
    );
    await wf.sleep(`${input.intervalSeconds}s`);
  }
}

// Enhanced Discord event processing workflows
export async function processDiscordMessage(event: any) {
  const {
    processDiscordEvent,
    analyzeMessageContent,
    triggerAutoResponses,
    updateUserActivity,
  } = wf.proxyActivities<{
    processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
    analyzeMessageContent: (message: any) => Promise<any>;
    triggerAutoResponses: (event: any, analysis: any) => Promise<any>;
    updateUserActivity: (
      userId: string,
      guildId: string,
      activityType: string,
    ) => Promise<any>;
  }>({
    startToCloseTimeout: "2 minutes",
  });

  try {
    // Process the basic event
    await processDiscordEvent(event);

    // Analyze message content for keywords, mentions, etc.
    const analysis = await analyzeMessageContent(event.message || event.data);

    // Trigger any auto-responses based on content
    if (analysis.shouldRespond) {
      await triggerAutoResponses(event, analysis);
    }

    // Update user activity metrics
    if (event.user_id) {
      await updateUserActivity(event.user_id, event.guild_id, "message");
    }

    return { success: true, analysis };
  } catch (error) {
    console.error("Discord message processing failed:", error);
    throw error;
  }
}

export async function processDiscordMemberJoin(event: any) {
  const {
    processDiscordEvent,
    sendWelcomeMessage,
    assignDefaultRoles,
    logMemberJoin,
  } = wf.proxyActivities<{
    processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
    sendWelcomeMessage: (guildId: string, member: any) => Promise<any>;
    assignDefaultRoles: (guildId: string, userId: string) => Promise<any>;
    logMemberJoin: (event: any) => Promise<any>;
  }>({
    startToCloseTimeout: "2 minutes",
  });

  try {
    // Process the basic event
    await processDiscordEvent(event);

    // Send welcome message
    if (event.guild_id) {
      await sendWelcomeMessage(event.guild_id, event.member || event.data);
    }

    // Assign default roles to new members
    await assignDefaultRoles(
      event.guild_id,
      event.user_id || event.member?.user?.id,
    );

    // Log the member join event
    await logMemberJoin(event);

    return { success: true, action: "member_welcomed" };
  } catch (error) {
    console.error("Discord member join processing failed:", error);
    throw error;
  }
}

export async function processDiscordMemberLeave(event: any) {
  const { processDiscordEvent, logMemberLeave, cleanupUserData } =
    wf.proxyActivities<{
      processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
      logMemberLeave: (event: any) => Promise<any>;
      cleanupUserData: (userId: string, guildId: string) => Promise<any>;
    }>({
      startToCloseTimeout: "2 minutes",
    });

  try {
    // Process the basic event
    await processDiscordEvent(event);

    // Log the member leave event
    await logMemberLeave(event);

    // Clean up temporary user data if needed
    if (event.user_id) {
      await cleanupUserData(event.user_id, event.guild_id);
    }

    return { success: true, action: "member_departure_processed" };
  } catch (error) {
    console.error("Discord member leave processing failed:", error);
    throw error;
  }
}

export async function processDiscordReaction(event: any) {
  const { processDiscordEvent, handleReactionLogic, updateReactionStats } =
    wf.proxyActivities<{
      processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
      handleReactionLogic: (event: any) => Promise<any>;
      updateReactionStats: (event: any) => Promise<any>;
    }>({
      startToCloseTimeout: "1 minute",
    });

  try {
    // Process the basic event
    await processDiscordEvent(event);

    // Handle special reaction logic (role assignments, polls, etc.)
    await handleReactionLogic(event);

    // Update reaction statistics
    await updateReactionStats(event);

    return { success: true, action: "reaction_processed" };
  } catch (error) {
    console.error("Discord reaction processing failed:", error);
    throw error;
  }
}

export async function processDiscordGenericEvent(event: any) {
  const { processDiscordEvent, logGenericEvent } = wf.proxyActivities<{
    processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
    logGenericEvent: (event: any) => Promise<any>;
  }>({
    startToCloseTimeout: "1 minute",
  });

  try {
    // Process the basic event
    await processDiscordEvent(event);

    // Log generic events for analytics
    await logGenericEvent(event);

    return { success: true, action: "generic_event_processed" };
  } catch (error) {
    console.error("Discord generic event processing failed:", error);
    throw error;
  }
}

// Vortex visual workflow execution
export async function executeVortexWorkflow(workflowDefinition: {
  nodes: Array<{
    id: string;
    type: string;
    data: any;
    position: { x: number; y: number };
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}) {
  console.log("🎨 [TEMPORAL WORKFLOW] Vortex visual workflow started");
  console.log(
    `📋 [TEMPORAL WORKFLOW] Processing ${workflowDefinition.nodes.length} nodes`,
  );

  const { executeVortexAction, logWorkflowStep } = wf.proxyActivities<{
    executeVortexAction: (node: any) => Promise<any>;
    logWorkflowStep: (node: any, result: any) => Promise<any>;
  }>({
    startToCloseTimeout: "2 minutes",
  });

  let executedActions = 0;
  const results = [];

  try {
    // Execute nodes in order (could be enhanced with proper dependency resolution)
    for (const node of workflowDefinition.nodes) {
      if (node.type === "actionNode") {
        console.log(
          `🔄 [TEMPORAL WORKFLOW] Executing action node: ${node.data.label}`,
        );

        const result = await executeVortexAction(node);
        results.push({
          nodeId: node.id,
          nodeType: node.data.label,
          success: result.success,
          result: result.data,
        });

        if (result.success) {
          executedActions++;
        }

        // Log each step
        await logWorkflowStep(node, result);

        // Small delay between actions
        await wf.sleep("500ms");
      }
    }

    console.log(
      `✅ [TEMPORAL WORKFLOW] Vortex workflow completed: ${executedActions} actions executed`,
    );

    return {
      success: true,
      executedActions,
      results,
      totalNodes: workflowDefinition.nodes.length,
      message: "Vortex visual workflow completed successfully",
    };
  } catch (error) {
    console.error("❌ [TEMPORAL WORKFLOW] Vortex workflow failed:", error);
    throw error;
  }
}

// Batch processing workflow for handling multiple Discord events
export async function batchProcessDiscordEvents(events: any[]) {
  const { processDiscordEvent } = wf.proxyActivities<{
    processDiscordEvent: (event: any, webhookUrl?: string) => Promise<any>;
  }>({
    startToCloseTimeout: "5 minutes",
  });

  const results = [];

  for (const event of events) {
    try {
      const result = await processDiscordEvent(event);
      results.push({ success: true, event: event.type, result });

      // Small delay between processing events to prevent rate limiting
      await wf.sleep("200ms");
    } catch (error) {
      console.error(`Failed to process event ${event.type}:`, error);
      results.push({
        success: false,
        event: event.type,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { processed: results.length, results };
}

// Workflow orchestration for complex Discord automation
export async function discordAutomationWorkflow(input: {
  guildId: string;
  automation: {
    type: "welcome_sequence" | "moderation" | "engagement" | "custom";
    config: any;
  };
  auth: string;
}) {
  const { executeDiscordAction, scheduleFollowUp, checkConditions } =
    wf.proxyActivities<{
      executeDiscordAction: (
        actionName: string,
        props: any,
        auth: string,
      ) => Promise<any>;
      scheduleFollowUp: (followUpConfig: any, guildId: string) => Promise<any>;
      checkConditions: (conditions: any[]) => Promise<boolean>;
    }>({
      startToCloseTimeout: "10 minutes",
    });

  try {
    const { automation, guildId, auth } = input;

    switch (automation.type) {
      case "welcome_sequence":
        // Multi-step welcome sequence
        await executeDiscordAction(
          "sendMessageWithBot",
          {
            channel_id: automation.config.welcomeChannelId,
            message: automation.config.welcomeMessage,
          },
          auth,
        );

        await wf.sleep("30s"); // Wait before next step

        if (automation.config.assignRoles) {
          for (const roleId of automation.config.assignRoles) {
            await executeDiscordAction(
              "add_role_to_member",
              {
                guild_id: guildId,
                user_id: automation.config.userId,
                role_id: roleId,
              },
              auth,
            );
            await wf.sleep("1s");
          }
        }
        break;

      case "moderation":
        // Automated moderation workflow
        const conditionsMet = await checkConditions(
          automation.config.conditions,
        );
        if (conditionsMet) {
          await executeDiscordAction(
            automation.config.action,
            automation.config.params,
            auth,
          );
        }
        break;

      case "engagement":
        // Engagement automation (polls, announcements, etc.)
        await executeDiscordAction(
          "sendMessageWithBot",
          {
            channel_id: automation.config.channelId,
            message: automation.config.content,
            embeds: automation.config.embeds,
          },
          auth,
        );
        break;

      default:
        // Custom automation handling
        for (const step of automation.config.steps || []) {
          await executeDiscordAction(step.action, step.params, auth);
          if (step.delay) {
            await wf.sleep(step.delay);
          }
        }
    }

    // Schedule follow-up if needed
    if (automation.config.followUp) {
      await scheduleFollowUp(automation.config.followUp, guildId);
    }

    return { success: true, automation: automation.type };
  } catch (error) {
    console.error("Discord automation workflow failed:", error);
    throw error;
  }
}
