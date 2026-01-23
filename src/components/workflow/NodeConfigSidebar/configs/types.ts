import type { Node } from "reactflow";

export interface NodeConfigProps {
  nodeId: string;
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onNestedChange: (parentKey: string, key: string, value: unknown) => void;
  workflowId?: string;
  webhookSecret?: string | null;
  allNodes?: Node[];
}
