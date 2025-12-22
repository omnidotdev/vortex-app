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

// Vortex visual workflow execution - Legacy format support
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

// DSL-based workflow execution with database tracking
export async function executeDslWorkflow(input: {
  workflowRunId: string;
  workflowId: string;
  definition: {
    version: "1.0";
    steps: Array<any>;
    edges: Array<any>;
    variables?: Record<string, any>;
    settings?: any;
  };
  triggerData?: Record<string, unknown>;
}) {
  console.log(
    `🎨 [TEMPORAL WORKFLOW] DSL workflow started: ${input.workflowRunId}`,
  );
  console.log(`📋 [TEMPORAL WORKFLOW] Steps: ${input.definition.steps.length}`);

  const {
    createWorkflowRunActivity,
    completeWorkflowRunActivity,
    logWorkflowStepActivity,
    executeDslAction,
  } = wf.proxyActivities<{
    createWorkflowRunActivity: (data: any) => Promise<any>;
    completeWorkflowRunActivity: (
      runId: string,
      status: "completed" | "failed",
      error?: string,
    ) => Promise<any>;
    logWorkflowStepActivity: (data: any) => Promise<any>;
    executeDslAction: (action: any) => Promise<any>;
  }>({
    startToCloseTimeout: "5 minutes",
    retry: {
      maximumAttempts: 3,
    },
  });

  try {
    // Create workflow run record
    await createWorkflowRunActivity({
      id: input.workflowRunId,
      workflowId: input.workflowId,
      workflowDefinition: input.definition,
      variables: {
        ...input.definition.variables,
        ...input.triggerData,
      },
    });

    // Find trigger step
    const triggerStep = input.definition.steps.find(
      (step: any) => step.type === "trigger",
    );

    if (!triggerStep) {
      throw new Error("No trigger step found in workflow definition");
    }

    // Execute workflow steps
    const executedSteps = new Map<string, any>();
    const stepQueue = [triggerStep.id];
    const variables: Record<string, unknown> = {
      ...input.definition.variables,
      ...input.triggerData,
    };

    while (stepQueue.length > 0) {
      const stepId = stepQueue.shift()!;

      // Skip if already executed
      if (executedSteps.has(stepId)) {
        continue;
      }

      const step = input.definition.steps.find((s: any) => s.id === stepId);
      if (!step) {
        console.warn(`⚠️ [TEMPORAL WORKFLOW] Step not found: ${stepId}`);
        continue;
      }

      const startTime = new Date().toISOString();
      console.log(
        `🔄 [TEMPORAL WORKFLOW] Executing step: ${step.name || step.id}`,
      );

      try {
        let stepResult: any = { success: true };

        // Execute based on step type
        switch (step.type) {
          case "trigger":
            // Trigger is the entry point, no execution needed
            stepResult = { triggered: true, data: input.triggerData };
            break;

          case "action":
            stepResult = await executeDslAction(step.action);

            // Store outputs in variables
            if (step.action.outputs) {
              for (const [varName, path] of Object.entries(
                step.action.outputs,
              )) {
                variables[varName] = extractValue(
                  stepResult.data,
                  path as string,
                );
              }
            }
            break;

          case "condition":
            const conditionResult = evaluateExpression(
              step.condition.expression,
              variables,
            );
            stepResult = { condition: conditionResult };

            // Add next step based on condition
            const nextStepId = conditionResult
              ? step.condition.trueBranch
              : step.condition.falseBranch;
            if (nextStepId) {
              stepQueue.push(nextStepId);
            }
            break;

          case "delay":
            const delayMs = convertToMilliseconds(
              step.delay.duration,
              step.delay.unit,
            );
            await wf.sleep(delayMs);
            stepResult = { delayMs };
            break;

          default:
            console.warn(
              `❓ [TEMPORAL WORKFLOW] Unknown step type: ${step.type}`,
            );
        }

        const endTime = new Date().toISOString();
        const duration =
          new Date(endTime).getTime() - new Date(startTime).getTime();

        // Log step execution
        await logWorkflowStepActivity({
          workflowRunId: input.workflowRunId,
          stepId: step.id,
          stepType: step.type,
          stepName: step.name || step.id,
          status: "success",
          output: stepResult,
          startedAt: startTime,
          completedAt: endTime,
          duration,
        });

        executedSteps.set(stepId, stepResult);

        // Add next steps from edges (if not a branching step)
        if (!["condition", "switch"].includes(step.type)) {
          const nextEdges = input.definition.edges.filter(
            (e: any) => e.source === stepId,
          );
          for (const edge of nextEdges) {
            stepQueue.push(edge.target);
          }
        }
      } catch (stepError) {
        console.error(
          `❌ [TEMPORAL WORKFLOW] Step failed: ${step.name || step.id}`,
          stepError,
        );

        await logWorkflowStepActivity({
          workflowRunId: input.workflowRunId,
          stepId: step.id,
          stepType: step.type,
          stepName: step.name || step.id,
          status: "failed",
          error:
            stepError instanceof Error ? stepError.message : String(stepError),
          startedAt: startTime,
          completedAt: new Date().toISOString(),
        });

        // Handle error based on step configuration
        if (step.onError?.action === "continue") {
          continue;
        } else {
          throw stepError;
        }
      }
    }

    // Complete workflow run
    await completeWorkflowRunActivity(input.workflowRunId, "completed");

    console.log(
      `✅ [TEMPORAL WORKFLOW] DSL workflow completed: ${executedSteps.size} steps executed`,
    );

    return {
      success: true,
      executedSteps: executedSteps.size,
      variables,
    };
  } catch (error) {
    console.error("❌ [TEMPORAL WORKFLOW] DSL workflow failed:", error);

    await completeWorkflowRunActivity(
      input.workflowRunId,
      "failed",
      error instanceof Error ? error.message : String(error),
    );

    throw error;
  }
}

// Helper functions
function evaluateExpression(
  expression: string,
  variables: Record<string, unknown>,
): boolean {
  // Simple evaluation - replace variables
  let evaluated = expression;
  for (const [key, value] of Object.entries(variables)) {
    evaluated = evaluated.replace(
      new RegExp(`\\$\\{${key}\\}`, "g"),
      String(value),
    );
  }

  // Simple boolean evaluation
  if (evaluated === "true") return true;
  if (evaluated === "false") return false;

  // Try to evaluate as comparison
  // This is a simplified implementation - in production use a proper expression evaluator
  return Boolean(evaluated);
}

function extractValue(obj: unknown, path: string): unknown {
  if (typeof obj !== "object" || obj === null) return undefined;

  const parts = path.split(".");
  let current: any = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return current;
}

function convertToMilliseconds(duration: number, unit: string): number {
  switch (unit) {
    case "seconds":
      return duration * 1000;
    case "minutes":
      return duration * 60 * 1000;
    case "hours":
      return duration * 60 * 60 * 1000;
    case "days":
      return duration * 24 * 60 * 60 * 1000;
    default:
      return duration;
  }
}
