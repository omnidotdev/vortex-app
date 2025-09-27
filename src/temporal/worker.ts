import { Worker } from "@temporalio/worker";
import * as activities from "./activities";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {
  console.log("🚀 Starting Temporal worker with workflowsPath...");
  console.log(
    "📁 Workflows path:",
    resolve(__dirname, "./simple-workflows.ts"),
  );
  console.log("📋 Activities:", Object.keys(activities));

  // Test Temporal connection
  try {
    const { Connection, Client } = await import("@temporalio/client");
    const connection = await Connection.connect({
      address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
    });
    const client = new Client({ connection, namespace: "default" });

    console.log("🔗 Testing Temporal connection...");
    console.log(
      "📍 Connecting to:",
      process.env.TEMPORAL_ADDRESS || "localhost:7233",
    );
    console.log("🏠 Using namespace: default");

    // Test if we can list workflows
    const workflows = [];
    const listIterator = client.workflow.list({ pageSize: 1 });
    for await (const workflow of listIterator) {
      workflows.push(workflow.workflowId);
      break; // Just get one to test connection
    }
    console.log("✅ Temporal connection verified - can see workflows");
  } catch (error) {
    console.error("❌ Temporal connection test failed:", error);
  }

  // Check if executeDiscordAction is registered
  if (activities.executeDiscordAction) {
    console.log("✅ executeDiscordAction is registered");
  } else {
    console.error("❌ executeDiscordAction is NOT registered");
  }

  // Show all activities with their types
  Object.keys(activities).forEach((name) => {
    console.log(
      `   - ${name}: ${typeof activities[name as keyof typeof activities]}`,
    );
  });

  const worker = await Worker.create({
    workflowsPath: resolve(__dirname, "./simple-workflows.ts"),
    activities,
    taskQueue: "vortex",
    debugMode: true,
  });

  console.log("✅ Temporal worker created successfully!");
  console.log("🎯 Task Queue: vortex");
  console.log("🌐 Ready to process workflow tasks...");

  await worker.run();
}

run().catch((err) => {
  console.error("❌ Worker failed:", err);
  process.exit(1);
});
