/**
 * Workflow Store - In-memory storage for workflow runs and steps
 *
 * This provides a simple storage layer for workflow execution tracking.
 * In production, this should be replaced with a proper database (PostgreSQL, etc.)
 */

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowDefinition: unknown;
  status: "running" | "completed" | "failed" | "cancelled";
  startedAt: string;
  completedAt?: string;
  error?: string;
  variables?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface WorkflowStepLog {
  id: string;
  workflowRunId: string;
  stepId: string;
  stepType: string;
  stepName: string;
  status: "running" | "success" | "failed" | "skipped";
  input?: unknown;
  output?: unknown;
  error?: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
}

/**
 * In-memory workflow store
 *
 * TODO: Replace with proper database implementation (Drizzle, Prisma, etc.)
 */
class WorkflowStore {
  private runs = new Map<string, WorkflowRun>();
  private stepLogs = new Map<string, WorkflowStepLog[]>();

  /**
   * Create a new workflow run
   */
  async createWorkflowRun(data: {
    id: string;
    workflowId: string;
    workflowDefinition: unknown;
    variables?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }): Promise<WorkflowRun> {
    const run: WorkflowRun = {
      id: data.id,
      workflowId: data.workflowId,
      workflowDefinition: data.workflowDefinition,
      status: "running",
      startedAt: new Date().toISOString(),
      variables: data.variables,
      metadata: data.metadata,
    };

    this.runs.set(run.id, run);
    this.stepLogs.set(run.id, []);

    console.log(`📝 [WORKFLOW STORE] Created workflow run: ${run.id}`);
    return run;
  }

  /**
   * Get a workflow run by ID
   */
  async getWorkflowRun(runId: string): Promise<WorkflowRun | null> {
    return this.runs.get(runId) || null;
  }

  /**
   * Update workflow run status
   */
  async updateWorkflowRun(
    runId: string,
    updates: Partial<WorkflowRun>,
  ): Promise<WorkflowRun | null> {
    const run = this.runs.get(runId);
    if (!run) {
      console.warn(`⚠️ [WORKFLOW STORE] Workflow run not found: ${runId}`);
      return null;
    }

    const updated = { ...run, ...updates };
    this.runs.set(runId, updated);

    console.log(`📝 [WORKFLOW STORE] Updated workflow run: ${runId}`, updates);
    return updated;
  }

  /**
   * Complete a workflow run
   */
  async completeWorkflowRun(
    runId: string,
    status: "completed" | "failed",
    error?: string,
  ): Promise<WorkflowRun | null> {
    return this.updateWorkflowRun(runId, {
      status,
      completedAt: new Date().toISOString(),
      error,
    });
  }

  /**
   * Log a workflow step
   */
  async logWorkflowStep(data: {
    workflowRunId: string;
    stepId: string;
    stepType: string;
    stepName: string;
    status: WorkflowStepLog["status"];
    input?: unknown;
    output?: unknown;
    error?: string;
    startedAt: string;
    completedAt?: string;
    duration?: number;
  }): Promise<WorkflowStepLog> {
    const log: WorkflowStepLog = {
      id: `${data.workflowRunId}-${data.stepId}-${Date.now()}`,
      ...data,
    };

    const logs = this.stepLogs.get(data.workflowRunId) || [];
    logs.push(log);
    this.stepLogs.set(data.workflowRunId, logs);

    console.log(
      `📝 [WORKFLOW STORE] Logged step: ${data.stepName} (${data.status})`,
    );
    return log;
  }

  /**
   * Get all step logs for a workflow run
   */
  async getWorkflowStepLogs(runId: string): Promise<WorkflowStepLog[]> {
    return this.stepLogs.get(runId) || [];
  }

  /**
   * Get workflow run with step logs
   */
  async getWorkflowRunWithLogs(runId: string): Promise<{
    run: WorkflowRun | null;
    logs: WorkflowStepLog[];
  }> {
    return {
      run: await this.getWorkflowRun(runId),
      logs: await this.getWorkflowStepLogs(runId),
    };
  }

  /**
   * List recent workflow runs
   */
  async listWorkflowRuns(limit: number = 50): Promise<WorkflowRun[]> {
    const runs = Array.from(this.runs.values());
    return runs
      .sort(
        (a, b) =>
          new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
      )
      .slice(0, limit);
  }

  /**
   * Clear all data (for testing)
   */
  async clear(): Promise<void> {
    this.runs.clear();
    this.stepLogs.clear();
    console.log("🗑️ [WORKFLOW STORE] Cleared all data");
  }

  /**
   * Get store statistics
   */
  getStats() {
    return {
      totalRuns: this.runs.size,
      totalStepLogs: Array.from(this.stepLogs.values()).reduce(
        (sum, logs) => sum + logs.length,
        0,
      ),
      runsByStatus: {
        running: Array.from(this.runs.values()).filter(
          (r) => r.status === "running",
        ).length,
        completed: Array.from(this.runs.values()).filter(
          (r) => r.status === "completed",
        ).length,
        failed: Array.from(this.runs.values()).filter(
          (r) => r.status === "failed",
        ).length,
      },
    };
  }
}

// Singleton instance
export const workflowStore = new WorkflowStore();

/**
 * Activity functions for Temporal workflows
 */
export async function createWorkflowRunActivity(data: {
  id: string;
  workflowId: string;
  workflowDefinition: unknown;
  variables?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}): Promise<WorkflowRun> {
  return workflowStore.createWorkflowRun(data);
}

export async function completeWorkflowRunActivity(
  runId: string,
  status: "completed" | "failed",
  error?: string,
): Promise<WorkflowRun | null> {
  return workflowStore.completeWorkflowRun(runId, status, error);
}

export async function logWorkflowStepActivity(data: {
  workflowRunId: string;
  stepId: string;
  stepType: string;
  stepName: string;
  status: WorkflowStepLog["status"];
  input?: unknown;
  output?: unknown;
  error?: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
}): Promise<WorkflowStepLog> {
  return workflowStore.logWorkflowStep(data);
}
