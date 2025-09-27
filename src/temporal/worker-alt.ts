import { Worker } from "@temporalio/worker";
import * as activities from "./activities";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {
  console.log("🔄 Starting alternative Temporal worker configuration...");

  try {
    // Try using workflowsPath instead of workflows object
    const worker = await Worker.create({
      workflowsPath: resolve(__dirname, "./workflows.ts"),
      activities,
      taskQueue: "vortex",
      debugMode: true,
    });

    console.log("✅ Alternative worker created successfully!");
    console.log("📁 Workflows path:", resolve(__dirname, "./workflows.ts"));
    console.log("🎯 Task Queue: vortex");
    console.log("📋 Activities registered:", Object.keys(activities).length);

    console.log("🌐 Worker is ready to process tasks...");
    console.log("🔗 Check Temporal UI at: http://localhost:8080");

    await worker.run();
  } catch (error) {
    console.error("❌ Failed to create alternative worker:", error);

    // Fallback to bundled workflows approach
    console.log("🔄 Trying fallback with bundled workflows...");

    try {
      const workflows = await import("./workflows");
      console.log("📋 Loaded workflows:", Object.keys(workflows));

      const fallbackWorker = await Worker.create({
        workflows,
        activities,
        taskQueue: "vortex",
        debugMode: true,
      });

      console.log("✅ Fallback worker created successfully!");
      await fallbackWorker.run();
    } catch (fallbackError) {
      console.error("❌ Fallback worker also failed:", fallbackError);
      process.exit(1);
    }
  }
}

run().catch((err) => {
  console.error("❌ Worker startup failed:", err);
  process.exit(1);
});
