import type { Node } from "reactflow";

/**
 * Generates a unique step name for a node.
 * If the base name already exists, appends a number (e.g., "OpenAI 2", "OpenAI 3").
 *
 * @param baseName - The desired name (usually from label or integration type)
 * @param existingNodes - All existing nodes in the workflow
 * @returns A unique step name
 */
export function generateUniqueStepName(
  baseName: string,
  existingNodes: Node[],
): string {
  // Clean the base name - remove special chars, normalize spaces
  const cleanName = baseName.trim().replace(/\s+/g, " ");

  if (!cleanName) {
    return generateUniqueStepName("Step", existingNodes);
  }

  // Get all existing step names
  const existingStepNames = new Set(
    existingNodes
      .map((n) => n.data?.stepName as string | undefined)
      .filter(Boolean),
  );

  // If the base name is not taken, use it
  if (!existingStepNames.has(cleanName)) {
    return cleanName;
  }

  // Find the next available number
  let counter = 2;
  while (existingStepNames.has(`${cleanName} ${counter}`)) {
    counter++;
  }

  return `${cleanName} ${counter}`;
}

/**
 * Gets a display-friendly name for a node based on its type/integration.
 */
export function getNodeBaseName(nodeData: Record<string, unknown>): string {
  // If there's a custom label, use it
  const label = nodeData.label as string | undefined;
  if (label && label !== "Untitled") {
    return label;
  }

  // Use integration name
  const integrationId = nodeData.integrationDefinitionId as string | undefined;
  if (integrationId) {
    // Capitalize first letter
    return integrationId.charAt(0).toUpperCase() + integrationId.slice(1);
  }

  // Use plugin name
  const pluginId = nodeData.pluginId as string | undefined;
  if (pluginId) {
    if (pluginId === "builtin:http") return "HTTP Request";
    if (pluginId === "builtin:transform") return "Transform";
    return pluginId.replace("builtin:", "").replace(/_/g, " ");
  }

  return "Step";
}

/**
 * Ensures all nodes in a workflow have unique step names.
 * Useful when loading a workflow or after imports.
 */
export function ensureStepNames(nodes: Node[]): Node[] {
  const result: Node[] = [];

  for (const node of nodes) {
    if (node.data?.stepName) {
      // Already has a step name, keep it
      result.push(node);
    } else {
      // Generate a step name
      const baseName = getNodeBaseName(node.data || {});
      const stepName = generateUniqueStepName(baseName, result);
      result.push({
        ...node,
        data: {
          ...node.data,
          stepName,
        },
      });
    }
  }

  return result;
}
