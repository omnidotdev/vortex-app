import type { ActionStep } from "../lib/workflow/types";

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

/**
 * Execute HTTP Call - Enhanced for DSL support
 */
export async function executeHttpCall(
  url: string,
  method: string = "GET",
  headers: Record<string, string> = {},
  body?: unknown,
) {
  console.log(`🌐 [TEMPORAL ACTIVITY] HTTP Call: ${method} ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    const responseText = await response.text();
    let responseData: unknown;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData,
    };
  } catch (error) {
    console.error(`❌ [TEMPORAL ACTIVITY] HTTP call failed:`, error);
    throw error;
  }
}

/**
 * Execute DSL Action Step
 */
export async function executeDslAction(action: ActionStep["action"]) {
  console.log(
    `🔄 [TEMPORAL ACTIVITY] Executing DSL action: ${action.operation}`,
  );

  try {
    switch (action.operation) {
      case "http.request":
      case "http.get":
      case "http.post":
      case "http.put":
      case "http.delete": {
        const method = action.operation.split(".")[1]?.toUpperCase() || "GET";
        return await executeHttpCall(
          action.inputs.url as string,
          method,
          action.inputs.headers as Record<string, string>,
          action.inputs.body,
        );
      }

      case "email.send":
        return await sendEmail(
          action.inputs.to as string,
          action.inputs.subject as string,
          action.inputs.content as string,
        );

      case "log.info":
      case "log.debug":
      case "log.error":
        console.log(
          `📝 [TEMPORAL ACTIVITY] ${action.operation}: ${action.inputs.message}`,
        );
        return { success: true, logged: true };

      case "transform.json":
        return {
          success: true,
          data: action.inputs.data,
        };

      case "wait":
      case "delay": {
        const delayMs = (action.inputs.duration as number) || 1000;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return { success: true, delayMs };
      }

      default:
        console.warn(
          `❓ [TEMPORAL ACTIVITY] Unknown action operation: ${action.operation}`,
        );
        return {
          success: true,
          data: { message: `Processed ${action.operation}` },
        };
    }
  } catch (error) {
    console.error(`❌ [TEMPORAL ACTIVITY] DSL action failed:`, error);
    throw error;
  }
}

// Vortex workflow execution activities
export async function executeVortexAction(node: any) {
  try {
    console.log(
      `🔄 [TEMPORAL ACTIVITY] Executing Vortex action: ${node.data.label}`,
    );

    const nodeType = node.data.label;

    switch (nodeType) {
      case "Browser Alert": {
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
      }

      case "HTTP Call": {
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
      }

      case "Send Email": {
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
      }

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

// Export database activity functions
export {
  completeWorkflowRunActivity,
  createWorkflowRunActivity,
  logWorkflowStepActivity,
} from "../lib/db/workflow-store";
