import { proxyActivities, sleep } from "@temporalio/workflow";

export async function testWorkflow(input: { message: string }) {
  console.log("🧪 Test workflow started:", input.message);
  await sleep("2s");
  console.log("✅ Test workflow completed");
  return { success: true, message: input.message };
}

export async function executeVortexWorkflow(workflowDefinition: any) {
  try {
    console.log("🎨 Vortex workflow started");
    console.log(
      "📋 Input workflow definition:",
      JSON.stringify(workflowDefinition, null, 2),
    );

    const { executeVortexAction } = proxyActivities<{
      executeVortexAction: (node: any) => Promise<any>;
    }>({
      startToCloseTimeout: "2 minutes",
    });
    console.log("✅ Activities proxied successfully");

    await sleep("1s");

    const actionNodes =
      workflowDefinition.nodes?.filter((n: any) => n.type === "actionNode") ||
      [];
    console.log(`Processing ${actionNodes.length} action nodes`);

    let executedActions = 0;
    const results = [];

    for (const node of actionNodes) {
      console.log(`🔄 Executing node ${node.id}: ${node.data?.label}`);

      try {
        let result;

        console.log("🔧 Executing action using executeVortexAction");
        result = await executeVortexAction(node);
        console.log(
          "📥 Vortex activity result:",
          JSON.stringify(result, null, 2),
        );

        const nodeResult = {
          nodeId: node.id,
          nodeType: node.data?.label,
          success: result?.success !== false,
          result: result?.data || result,
        };

        results.push(nodeResult);
        console.log(
          "✅ Node result added:",
          JSON.stringify(nodeResult, null, 2),
        );

        if (result?.success !== false) {
          executedActions++;
          console.log(
            `✅ Successfully executed ${executedActions}/${actionNodes.length} actions`,
          );
        }
      } catch (error) {
        console.error(`❌ Failed to execute ${node.data?.label}:`, error);
        const errorResult = {
          nodeId: node.id,
          nodeType: node.data?.label,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
        results.push(errorResult);
        console.log(
          "❌ Error result added:",
          JSON.stringify(errorResult, null, 2),
        );
      }

      console.log(`⏳ Waiting 500ms before next node...`);
      await sleep("500ms");
    }

    console.log("🎉 Vortex workflow completed!");
    console.log(
      `📊 Final stats: ${executedActions}/${actionNodes.length} actions executed`,
    );
    console.log("📋 All results:", JSON.stringify(results, null, 2));

    const finalResult = {
      success: true,
      executedActions,
      totalNodes: actionNodes.length,
      results,
      message: `Workflow completed: ${executedActions}/${actionNodes.length} actions executed`,
    };

    console.log(
      "🚀 Returning final result:",
      JSON.stringify(finalResult, null, 2),
    );
    return finalResult;
  } catch (error) {
    console.error("❌ [WORKFLOW] Entire workflow failed:", error);
    console.error(
      "❌ [WORKFLOW] Error stack:",
      error instanceof Error ? error.stack : "No stack",
    );

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      executedActions: 0,
      totalNodes: 0,
      results: [],
    };
  }
}
