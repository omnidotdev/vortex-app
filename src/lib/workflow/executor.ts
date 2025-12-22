/**
 * Workflow Executor
 *
 * Executes workflow definitions (DSL) by traversing nodes and edges.
 * This is the core execution engine that interprets the visual workflow DSL.
 */

import type {
  ActionStep,
  ConditionStep,
  DelayStep,
  EdgeDefinition,
  GateStep,
  LoopStep,
  ParallelStep,
  Step,
  SwitchStep,
  WorkflowDefinition,
} from "./types";

export interface ExecutionContext {
  variables: Record<string, unknown>;
  stepResults: Map<string, StepResult>;
  iterationDepth: number;
  maxIterations: number;
}

export interface StepResult {
  stepId: string;
  stepType: string;
  status: "success" | "failed" | "skipped";
  output?: unknown;
  error?: string;
  startTime: string;
  endTime?: string;
  duration?: number;
}

export interface ExecutionResult {
  success: boolean;
  executedSteps: StepResult[];
  finalVariables: Record<string, unknown>;
  error?: string;
}

/**
 * Main workflow executor class
 */
export class WorkflowExecutor {
  private definition: WorkflowDefinition;
  private context: ExecutionContext;
  private steps: Map<string, Step>;
  private edges: EdgeDefinition[];
  private activityExecutor?: ActivityExecutor;

  constructor(
    definition: WorkflowDefinition,
    activityExecutor?: ActivityExecutor,
  ) {
    this.definition = definition;
    this.steps = new Map(definition.steps.map((step) => [step.id, step]));
    this.edges = definition.edges;
    this.context = {
      variables: this.initializeVariables(definition.variables || {}),
      stepResults: new Map(),
      iterationDepth: 0,
      maxIterations: 1000, // Safety limit
    };
    this.activityExecutor = activityExecutor;
  }

  /**
   * Initialize workflow variables with defaults
   */
  private initializeVariables(
    variableDefinitions: Record<string, any>,
  ): Record<string, unknown> {
    const variables: Record<string, unknown> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
      variables[name] = def.default;
    }
    return variables;
  }

  /**
   * Execute the workflow
   */
  async execute(): Promise<ExecutionResult> {
    try {
      // Find the trigger step (entry point)
      const triggerStep = this.definition.steps.find(
        (step) => step.type === "trigger",
      );

      if (!triggerStep) {
        throw new Error("No trigger step found in workflow");
      }

      // Start execution from the trigger
      await this.executeStep(triggerStep.id);

      return {
        success: true,
        executedSteps: Array.from(this.context.stepResults.values()),
        finalVariables: this.context.variables,
      };
    } catch (error) {
      return {
        success: false,
        executedSteps: Array.from(this.context.stepResults.values()),
        finalVariables: this.context.variables,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Execute a single step
   */
  private async executeStep(stepId: string): Promise<void> {
    const step = this.steps.get(stepId);
    if (!step) {
      throw new Error(`Step not found: ${stepId}`);
    }

    const startTime = new Date().toISOString();
    let result: StepResult;

    try {
      // Execute step based on type
      switch (step.type) {
        case "trigger":
          result = await this.executeTrigger(step);
          break;
        case "action":
          result = await this.executeAction(step as ActionStep);
          break;
        case "condition":
          result = await this.executeCondition(step as ConditionStep);
          break;
        case "switch":
          result = await this.executeSwitch(step as SwitchStep);
          break;
        case "loop":
          result = await this.executeLoop(step as LoopStep);
          break;
        case "delay":
          result = await this.executeDelay(step as DelayStep);
          break;
        case "gate":
          result = await this.executeGate(step as GateStep);
          break;
        case "parallel":
          result = await this.executeParallel(step as ParallelStep);
          break;
        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }

      result.startTime = startTime;
      result.endTime = new Date().toISOString();
      result.duration =
        new Date(result.endTime).getTime() - new Date(startTime).getTime();

      this.context.stepResults.set(stepId, result);

      // Execute next steps (unless this step handles its own routing)
      if (!["condition", "switch", "loop"].includes(step.type)) {
        await this.executeNextSteps(stepId);
      }
    } catch (error) {
      result = {
        stepId,
        stepType: step.type,
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
        startTime,
        endTime: new Date().toISOString(),
      };
      this.context.stepResults.set(stepId, result);

      // Handle error based on step's error handler
      if (step.onError) {
        await this.handleError(step, error);
      } else {
        throw error;
      }
    }
  }

  /**
   * Execute trigger step
   */
  private async executeTrigger(step: Step): Promise<StepResult> {
    // Triggers are entry points, they don't execute actions themselves
    return {
      stepId: step.id,
      stepType: "trigger",
      status: "success",
      output: { triggered: true },
      startTime: new Date().toISOString(),
    };
  }

  /**
   * Execute action step
   */
  private async executeAction(step: ActionStep): Promise<StepResult> {
    if (this.activityExecutor) {
      const output = await this.activityExecutor.executeAction(
        step.action,
        this.context,
      );

      // Store outputs in context variables
      if (step.action.outputs) {
        for (const [varName, path] of Object.entries(step.action.outputs)) {
          this.context.variables[varName] = this.extractValue(output, path);
        }
      }

      return {
        stepId: step.id,
        stepType: "action",
        status: "success",
        output,
        startTime: new Date().toISOString(),
      };
    }

    // Fallback if no activity executor provided
    return {
      stepId: step.id,
      stepType: "action",
      status: "success",
      output: { message: `Action executed: ${step.action.operation}` },
      startTime: new Date().toISOString(),
    };
  }

  /**
   * Execute condition step
   */
  private async executeCondition(step: ConditionStep): Promise<StepResult> {
    const condition = this.evaluateExpression(step.condition.expression);
    const nextStepId = condition
      ? step.condition.trueBranch
      : step.condition.falseBranch;

    const result: StepResult = {
      stepId: step.id,
      stepType: "condition",
      status: "success",
      output: { condition, nextStep: nextStepId },
      startTime: new Date().toISOString(),
    };

    // Execute the chosen branch
    if (nextStepId) {
      await this.executeStep(nextStepId);
    }

    return result;
  }

  /**
   * Execute switch step
   */
  private async executeSwitch(step: SwitchStep): Promise<StepResult> {
    const value = this.evaluateExpression(step.switch.expression);

    // Find matching case
    const matchingCase = step.switch.cases.find((c) => c.value === value);

    const nextStepId = matchingCase?.next || step.switch.default;

    const result: StepResult = {
      stepId: step.id,
      stepType: "switch",
      status: "success",
      output: { value, matchedCase: matchingCase?.label, nextStep: nextStepId },
      startTime: new Date().toISOString(),
    };

    // Execute the chosen path
    if (nextStepId) {
      await this.executeStep(nextStepId);
    }

    return result;
  }

  /**
   * Execute loop step
   */
  private async executeLoop(step: LoopStep): Promise<StepResult> {
    if (this.context.iterationDepth >= this.context.maxIterations) {
      throw new Error("Maximum iteration depth exceeded");
    }

    this.context.iterationDepth++;
    const iterations: unknown[] = [];

    try {
      switch (step.loop.type) {
        case "forEach": {
          const collection = this.evaluateExpression(
            step.loop.collection || "[]",
          );
          if (!Array.isArray(collection)) {
            throw new Error("forEach loop requires an array");
          }

          for (let i = 0; i < collection.length; i++) {
            if (step.loop.itemVariable) {
              this.context.variables[step.loop.itemVariable] = collection[i];
            }
            if (step.loop.indexVariable) {
              this.context.variables[step.loop.indexVariable] = i;
            }

            // Execute loop body
            for (const bodyStepId of step.loop.body) {
              await this.executeStep(bodyStepId);
            }

            iterations.push({ index: i, item: collection[i] });
          }
          break;
        }

        case "while": {
          let iteration = 0;
          const maxLoopIterations = step.loop.maxIterations || 100;

          while (
            this.evaluateExpression(step.loop.condition || "false") &&
            iteration < maxLoopIterations
          ) {
            // Execute loop body
            for (const bodyStepId of step.loop.body) {
              await this.executeStep(bodyStepId);
            }

            iterations.push({ iteration });
            iteration++;
          }
          break;
        }

        case "times": {
          const count = step.loop.count || 0;
          for (let i = 0; i < count; i++) {
            if (step.loop.indexVariable) {
              this.context.variables[step.loop.indexVariable] = i;
            }

            // Execute loop body
            for (const bodyStepId of step.loop.body) {
              await this.executeStep(bodyStepId);
            }

            iterations.push({ iteration: i });
          }
          break;
        }
      }

      return {
        stepId: step.id,
        stepType: "loop",
        status: "success",
        output: { iterations: iterations.length, details: iterations },
        startTime: new Date().toISOString(),
      };
    } finally {
      this.context.iterationDepth--;
    }
  }

  /**
   * Execute delay step
   */
  private async executeDelay(step: DelayStep): Promise<StepResult> {
    const durationMs = this.convertToMilliseconds(
      step.delay.duration,
      step.delay.unit,
    );

    await new Promise((resolve) => setTimeout(resolve, durationMs));

    return {
      stepId: step.id,
      stepType: "delay",
      status: "success",
      output: { delayMs: durationMs },
      startTime: new Date().toISOString(),
    };
  }

  /**
   * Execute gate step (approval/signal)
   */
  private async executeGate(step: GateStep): Promise<StepResult> {
    // Gates would typically wait for external signals
    // For now, we'll simulate immediate approval
    return {
      stepId: step.id,
      stepType: "gate",
      status: "success",
      output: { gateType: step.gate.type, status: "approved" },
      startTime: new Date().toISOString(),
    };
  }

  /**
   * Execute parallel step
   */
  private async executeParallel(step: ParallelStep): Promise<StepResult> {
    const branchResults = await Promise.allSettled(
      step.parallel.branches.map(async (branch) => {
        for (const stepId of branch) {
          await this.executeStep(stepId);
        }
      }),
    );

    const successful = branchResults.filter(
      (r) => r.status === "fulfilled",
    ).length;

    return {
      stepId: step.id,
      stepType: "parallel",
      status: successful > 0 ? "success" : "failed",
      output: {
        totalBranches: step.parallel.branches.length,
        successful,
        failed: branchResults.length - successful,
      },
      startTime: new Date().toISOString(),
    };
  }

  /**
   * Execute next steps based on edges
   */
  private async executeNextSteps(stepId: string): Promise<void> {
    const outgoingEdges = this.edges.filter((edge) => edge.source === stepId);

    for (const edge of outgoingEdges) {
      await this.executeStep(edge.target);
    }
  }

  /**
   * Handle step errors
   */
  private async handleError(step: Step, error: unknown): Promise<void> {
    const onError = step.onError;
    if (!onError) return;

    switch (onError.action) {
      case "continue":
        // Continue to next step
        await this.executeNextSteps(step.id);
        break;

      case "stop":
        // Stop execution
        throw error;

      case "retry": {
        const retryCount = onError.retryCount || 3;
        for (let i = 0; i < retryCount; i++) {
          try {
            if (onError.retryDelayMs) {
              await new Promise((resolve) =>
                setTimeout(resolve, onError.retryDelayMs),
              );
            }
            await this.executeStep(step.id);
            return; // Success
          } catch (retryError) {
            if (i === retryCount - 1) {
              throw retryError;
            }
          }
        }
        break;
      }

      case "goto":
        if (onError.gotoStepId) {
          await this.executeStep(onError.gotoStepId);
        }
        break;
    }
  }

  /**
   * Evaluate an expression in the context
   */
  private evaluateExpression(expression: string): unknown {
    try {
      // Simple variable replacement
      let evaluated = expression;
      for (const [key, value] of Object.entries(this.context.variables)) {
        evaluated = evaluated.replace(
          new RegExp(`\\$\\{${key}\\}`, "g"),
          String(value),
        );
      }

      // If it's just a variable reference, return the value
      if (evaluated.startsWith("${") && evaluated.endsWith("}")) {
        const varName = evaluated.slice(2, -1);
        return this.context.variables[varName];
      }

      // Simple evaluation for booleans and numbers
      if (evaluated === "true") return true;
      if (evaluated === "false") return false;
      if (!Number.isNaN(Number(evaluated))) return Number(evaluated);

      return evaluated;
    } catch {
      return expression;
    }
  }

  /**
   * Extract value from object using path
   */
  private extractValue(obj: unknown, path: string): unknown {
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

  /**
   * Convert duration to milliseconds
   */
  private convertToMilliseconds(duration: number, unit: string): number {
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
}

/**
 * Activity executor interface for plugging in Temporal activities or other execution backends
 */
export interface ActivityExecutor {
  executeAction(
    action: ActionStep["action"],
    context: ExecutionContext,
  ): Promise<unknown>;
}
