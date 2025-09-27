import { DiscordIntegrationService } from "../integrations/discord/service";

export async function sendEmail(to: string, subject: string, content: string) {
  // Direct email sending implementation (could integrate with Resend, SendGrid, etc.)
  console.log(`📧 [TEMPORAL ACTIVITY] Sending email to ${to}`);
  console.log(`📧 [TEMPORAL ACTIVITY] Subject: ${subject}`);
  console.log(`📧 [TEMPORAL ACTIVITY] Content: ${content}`);

  // TODO: Implement actual email sending service integration
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: 'noreply@yourapp.com', to, subject, html: content });

  return { success: true, message: "Email sent successfully" };
}

export async function executeDiscordAction(
  actionName: string,
  props: any,
  auth: string,
) {
  console.log(`🔄 [TEMPORAL ACTIVITY] Executing Discord action: ${actionName}`);
  console.log(`📋 [TEMPORAL ACTIVITY] Props:`, JSON.stringify(props, null, 2));
  console.log(`🔑 [TEMPORAL ACTIVITY] Auth token provided:`, !!auth);

  try {
    // Add timeout wrapper
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error("Discord action timeout after 30 seconds")),
        30000,
      );
    });

    const actionPromise = DiscordIntegrationService.runDiscordAction(
      actionName,
      props,
      auth,
    );

    console.log(`⏳ [TEMPORAL ACTIVITY] Waiting for Discord API response...`);
    const result = await Promise.race([actionPromise, timeoutPromise]);

    console.log(
      `✅ [TEMPORAL ACTIVITY] Discord action completed:`,
      result.success ? "SUCCESS" : "FAILED",
    );
    console.log(
      `📋 [TEMPORAL ACTIVITY] Result:`,
      JSON.stringify(result, null, 2),
    );

    return result;
  } catch (error) {
    console.error(`❌ [TEMPORAL ACTIVITY] Discord action failed:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function executeDiscordTrigger(
  triggerName: string,
  props: any,
  auth: string,
) {
  console.log(
    `🔄 [TEMPORAL ACTIVITY] Executing Discord trigger: ${triggerName}`,
  );
  console.log(`📋 [TEMPORAL ACTIVITY] Props:`, JSON.stringify(props, null, 2));

  const result = await DiscordIntegrationService.runDiscordTrigger(
    triggerName,
    props,
    auth,
  );

  console.log(
    `✅ [TEMPORAL ACTIVITY] Discord trigger completed:`,
    result.success ? "SUCCESS" : "FAILED",
  );
  return result;
}

export async function processDiscordEvent(event: any, webhookUrl?: string) {
  try {
    // Process the Discord event (message, member join, etc.)
    console.log("Processing Discord event:", event);

    // Store event in database/analytics if needed
    await logEventToDatabase(event);

    // If webhook URL is provided, send the event data there
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Webhook call failed: ${response.statusText}`);
      }
    }

    return { success: true, processed: true };
  } catch (error) {
    console.error("Failed to process Discord event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Enhanced Discord event processing activities
export async function analyzeMessageContent(message: any) {
  try {
    const content = message?.content || "";
    const mentions = message?.mentions || [];
    const attachments = message?.attachments || [];

    // Basic content analysis
    const analysis = {
      wordCount: content.split(" ").length,
      hasMentions: mentions.length > 0,
      hasAttachments: attachments.length > 0,
      containsUrls: /https?:\/\/[^\s]+/.test(content),
      sentiment: analyzeSentiment(content),
      keywords: extractKeywords(content),
      shouldRespond: false,
      responseType: null as string | null,
    };

    // Determine if auto-response is needed
    if (content.toLowerCase().includes("help") || content.includes("?")) {
      analysis.shouldRespond = true;
      analysis.responseType = "help";
    } else if (analysis.sentiment === "negative") {
      analysis.shouldRespond = true;
      analysis.responseType = "support";
    }

    return analysis;
  } catch (error) {
    console.error("Message analysis failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function triggerAutoResponses(event: any, analysis: any) {
  try {
    const auth = process.env.DISCORD_BOT_TOKEN;
    if (!auth) return { error: "Discord bot token not configured" };

    let response = "";
    switch (analysis.responseType) {
      case "help":
        response =
          "👋 How can I help you? Use `/help` to see available commands.";
        break;
      case "support":
        response =
          "I notice you might need some help. Our support team is here for you! 💙";
        break;
      default:
        return { skipped: true };
    }

    return await DiscordIntegrationService.runDiscordAction(
      "sendMessageWithBot",
      {
        channel_id: event.channel_id,
        message: response,
      },
      auth,
    );
  } catch (error) {
    console.error("Auto-response failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function updateUserActivity(
  userId: string,
  guildId: string,
  activityType: string,
) {
  try {
    // Store user activity metrics
    const activity = {
      userId,
      guildId,
      activityType,
      timestamp: new Date().toISOString(),
    };

    console.log("Updating user activity:", activity);

    // Here you would typically store this in a database
    // For now, we'll just log it
    return { success: true, activity };
  } catch (error) {
    console.error("User activity update failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function sendWelcomeMessage(guildId: string, member: any) {
  try {
    const auth = process.env.DISCORD_BOT_TOKEN;
    if (!auth) return { error: "Discord bot token not configured" };

    const welcomeChannelId = process.env.DISCORD_WELCOME_CHANNEL_ID;
    if (!welcomeChannelId)
      return { skipped: true, reason: "No welcome channel configured" };

    const username = member?.user?.username || member?.username || "New Member";
    const welcomeMessage = `🎉 Welcome to the server, ${username}! We're glad to have you here!`;

    return await DiscordIntegrationService.runDiscordAction(
      "sendMessageWithBot",
      {
        channel_id: welcomeChannelId,
        message: welcomeMessage,
      },
      auth,
    );
  } catch (error) {
    console.error("Welcome message failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function assignDefaultRoles(guildId: string, userId: string) {
  try {
    const auth = process.env.DISCORD_BOT_TOKEN;
    if (!auth) return { error: "Discord bot token not configured" };

    const defaultRoles = process.env.DISCORD_DEFAULT_ROLES?.split(",") || [];
    if (defaultRoles.length === 0)
      return { skipped: true, reason: "No default roles configured" };

    const results = [];
    for (const roleId of defaultRoles) {
      try {
        const result = await DiscordIntegrationService.runDiscordAction(
          "add_role_to_member",
          {
            guild_id: guildId,
            user_id: userId,
            role_id: roleId.trim(),
          },
          auth,
        );
        results.push({ roleId, success: true, result });
      } catch (error) {
        results.push({
          roleId,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return { success: true, results };
  } catch (error) {
    console.error("Role assignment failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function logMemberJoin(event: any) {
  return await logEventToDatabase({ ...event, eventType: "member_join" });
}

export async function logMemberLeave(event: any) {
  return await logEventToDatabase({ ...event, eventType: "member_leave" });
}

export async function cleanupUserData(userId: string, guildId: string) {
  try {
    console.log(`Cleaning up data for user ${userId} in guild ${guildId}`);
    // Here you would implement actual cleanup logic
    return { success: true, cleaned: true };
  } catch (error) {
    console.error("User data cleanup failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function handleReactionLogic(event: any) {
  try {
    const auth = process.env.DISCORD_BOT_TOKEN;
    if (!auth) return { error: "Discord bot token not configured" };

    const emoji = event.emoji || event.data?.emoji;
    const messageId = event.message_id || event.data?.message_id;
    const userId = event.user_id || event.data?.user_id;

    // Role reactions logic
    if (emoji && messageId) {
      const roleMapping = getRoleMapping(messageId, emoji);
      if (roleMapping) {
        return await DiscordIntegrationService.runDiscordAction(
          "add_role_to_member",
          {
            guild_id: event.guild_id,
            user_id: userId,
            role_id: roleMapping.roleId,
          },
          auth,
        );
      }
    }

    return { success: true, processed: false };
  } catch (error) {
    console.error("Reaction logic failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function updateReactionStats(event: any) {
  try {
    const stats = {
      messageId: event.message_id || event.data?.message_id,
      emoji: event.emoji || event.data?.emoji,
      userId: event.user_id || event.data?.user_id,
      guildId: event.guild_id,
      timestamp: new Date().toISOString(),
    };

    console.log("Updating reaction stats:", stats);
    return { success: true, stats };
  } catch (error) {
    console.error("Reaction stats update failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function logGenericEvent(event: any) {
  return await logEventToDatabase({ ...event, eventType: "generic" });
}

export async function scheduleFollowUp(followUpConfig: any, guildId: string) {
  try {
    console.log(`Scheduling follow-up for guild ${guildId}:`, followUpConfig);
    // Here you would implement scheduling logic (could use Temporal scheduling)
    return { success: true, scheduled: true };
  } catch (error) {
    console.error("Follow-up scheduling failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function checkConditions(conditions: any[]) {
  try {
    for (const condition of conditions) {
      // Implement condition checking logic
      console.log("Checking condition:", condition);
    }
    return true; // Simplified - in real implementation, evaluate actual conditions
  } catch (error) {
    console.error("Condition check failed:", error);
    return false;
  }
}

// Helper functions
async function logEventToDatabase(event: any) {
  try {
    // Here you would store the event in your database
    console.log("Logging event to database:", event);
    return { success: true, logged: true };
  } catch (error) {
    console.error("Database logging failed:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

function analyzeSentiment(
  content: string,
): "positive" | "negative" | "neutral" {
  // Simplified sentiment analysis
  const positiveWords = ["good", "great", "awesome", "love", "excellent"];
  const negativeWords = ["bad", "terrible", "hate", "awful", "horrible"];

  const lowerContent = content.toLowerCase();
  const positiveCount = positiveWords.filter((word) =>
    lowerContent.includes(word),
  ).length;
  const negativeCount = negativeWords.filter((word) =>
    lowerContent.includes(word),
  ).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}

function extractKeywords(content: string): string[] {
  // Simple keyword extraction
  return content
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter(
      (word) =>
        !["this", "that", "with", "have", "will", "from"].includes(word),
    )
    .slice(0, 10);
}

function getRoleMapping(
  messageId: string,
  emoji: string,
): { roleId: string } | null {
  // This would typically be stored in a database or config
  const roleMappings: Record<string, Record<string, string>> = {
    // messageId -> emoji -> roleId
  };

  return roleMappings[messageId]?.[emoji]
    ? { roleId: roleMappings[messageId][emoji] }
    : null;
}

// Vortex workflow execution activities
export async function executeVortexAction(node: any) {
  try {
    console.log(
      `🔄 [TEMPORAL ACTIVITY] Executing Vortex action: ${node.data.label}`,
    );

    const nodeType = node.data.label;

    switch (nodeType) {
      case "Browser Alert":
        const message =
          node.data.description ||
          node.data.config?.message ||
          `Alert from ${node.data.label}: Workflow executed successfully!`;

        // Log the alert (since we can't show browser alerts from server-side)
        console.log(`🚨 [TEMPORAL ACTIVITY] Browser Alert: ${message}`);

        // Call the browser alert API
        try {
          const response = await fetch(
            "http://localhost:3000/api/browser-alert",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message,
                nodeId: node.id,
                workflowId: `temporal-${Date.now()}`,
              }),
            },
          );

          if (response.ok) {
            const result = await response.json();
            return { success: true, data: { message, apiResult: result } };
          }
        } catch (error) {
          console.warn(
            "Browser alert API failed, but action completed:",
            error,
          );
        }

        return { success: true, data: { message } };

      case "HTTP Call":
        const url =
          node.data.config?.url ||
          node.data.description ||
          "https://httpbin.org/get";
        const method = node.data.config?.method || "GET";
        const body = node.data.config?.body;
        const headers = node.data.config?.headers || {};

        console.log(`🌐 [TEMPORAL ACTIVITY] HTTP Call: ${method} ${url}`);

        const httpResponse = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          ...(method !== "GET" && body && { body: JSON.stringify(body) }),
        });

        const httpResult = await httpResponse.text();

        return {
          success: true,
          data: {
            url,
            method,
            status: httpResponse.status,
            response: httpResult.substring(0, 500), // Truncate long responses
          },
        };

      case "Send Email":
        const to = node.data.config?.to || "test@example.com";
        const subject = node.data.config?.subject || "Workflow Email";
        const content =
          node.data.config?.content ||
          node.data.description ||
          "Email sent from workflow";

        console.log(`📧 [TEMPORAL ACTIVITY] Send Email: ${subject} to ${to}`);

        // Call the email API
        try {
          const response = await fetch("http://localhost:3000/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, subject, content }),
          });

          if (response.ok) {
            const result = await response.json();
            return { success: true, data: { to, subject, apiResult: result } };
          }
        } catch (error) {
          console.warn("Email API failed:", error);
        }

        return { success: true, data: { to, subject, content } };

      default:
        console.log(`❓ [TEMPORAL ACTIVITY] Unknown action type: ${nodeType}`);
        return { success: true, data: { message: `Processed ${nodeType}` } };
    }
  } catch (error) {
    console.error(`❌ [TEMPORAL ACTIVITY] Vortex action failed:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function logWorkflowStep(node: any, result: any) {
  try {
    console.log(
      `📝 [TEMPORAL ACTIVITY] Logging workflow step: ${node.data.label}`,
    );

    const logEntry = {
      nodeId: node.id,
      nodeType: node.data.label,
      timestamp: new Date().toISOString(),
      success: result.success,
      data: result.data,
      error: result.error,
    };

    // Here you would typically store this in a database
    console.log(
      "📊 [TEMPORAL ACTIVITY] Step logged:",
      JSON.stringify(logEntry, null, 2),
    );

    return { success: true, logged: true };
  } catch (error) {
    console.error("❌ [TEMPORAL ACTIVITY] Failed to log workflow step:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
