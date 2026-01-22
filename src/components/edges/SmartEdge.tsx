import { memo, useMemo } from "react";
import { Position, getSmoothStepPath, useStore } from "reactflow";

import type { EdgeProps, ReactFlowState } from "reactflow";

/** Node dimensions for edge calculations */
const NODE_WIDTH = 270;
const NODE_MIN_HEIGHT = 120;

/** Edge styling constants */
const EDGE_STROKE_WIDTH = 3;
const CONNECTOR_SIZE = 10;
const EDGE_OFFSET = 20; // Distance from node before first turn

interface NodeRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculate the center point of each side of a node rectangle
 */
function getNodeSideCenters(rect: NodeRect) {
  return {
    top: { x: rect.x + rect.width / 2, y: rect.y },
    bottom: { x: rect.x + rect.width / 2, y: rect.y + rect.height },
    left: { x: rect.x, y: rect.y + rect.height / 2 },
    right: { x: rect.x + rect.width, y: rect.y + rect.height / 2 },
  };
}

/**
 * Calculate distance between two points
 */
function distance(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
): number {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

/**
 * Determine the best connection points between two nodes.
 * Finds the pair of sides (one from each node) that results in the shortest path
 * while respecting the natural flow direction.
 */
function getBestConnectionPoints(
  sourceRect: NodeRect,
  targetRect: NodeRect,
): {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
} {
  const sourceSides = getNodeSideCenters(sourceRect);
  const targetSides = getNodeSideCenters(targetRect);

  // Define valid source-target position pairs (source flows out, target receives)
  const positionPairs: {
    sourcePos: Position;
    targetPos: Position;
    source: { x: number; y: number };
    target: { x: number; y: number };
  }[] = [
    {
      sourcePos: Position.Bottom,
      targetPos: Position.Top,
      source: sourceSides.bottom,
      target: targetSides.top,
    },
    {
      sourcePos: Position.Top,
      targetPos: Position.Bottom,
      source: sourceSides.top,
      target: targetSides.bottom,
    },
    {
      sourcePos: Position.Right,
      targetPos: Position.Left,
      source: sourceSides.right,
      target: targetSides.left,
    },
    {
      sourcePos: Position.Left,
      targetPos: Position.Right,
      source: sourceSides.left,
      target: targetSides.right,
    },
  ];

  // Calculate which pair gives us the best path
  // Prefer natural flow directions based on relative positions
  let bestPair = positionPairs[0]!;
  let bestScore = Infinity;

  for (const pair of positionPairs) {
    const dist = distance(pair.source, pair.target);

    // Add penalty for paths that go against natural flow
    let penalty = 0;

    // Prefer bottom-to-top when target is below source
    if (pair.sourcePos === Position.Bottom && pair.targetPos === Position.Top) {
      if (targetRect.y > sourceRect.y + sourceRect.height) {
        penalty -= 50; // Bonus for natural downward flow
      }
    }

    // Prefer top-to-bottom when target is above source
    if (pair.sourcePos === Position.Top && pair.targetPos === Position.Bottom) {
      if (targetRect.y + targetRect.height < sourceRect.y) {
        penalty -= 50;
      }
    }

    // Prefer right-to-left when target is to the right
    if (pair.sourcePos === Position.Right && pair.targetPos === Position.Left) {
      if (targetRect.x > sourceRect.x + sourceRect.width) {
        penalty -= 50;
      }
    }

    // Prefer left-to-right when target is to the left
    if (pair.sourcePos === Position.Left && pair.targetPos === Position.Right) {
      if (targetRect.x + targetRect.width < sourceRect.x) {
        penalty -= 50;
      }
    }

    const score = dist + penalty;
    if (score < bestScore) {
      bestScore = score;
      bestPair = pair;
    }
  }

  return {
    sourceX: bestPair.source.x,
    sourceY: bestPair.source.y,
    targetX: bestPair.target.x,
    targetY: bestPair.target.y,
    sourcePosition: bestPair.sourcePos,
    targetPosition: bestPair.targetPos,
  };
}

// Selector to get nodes from store - returns positions to trigger re-renders on move
const nodesSelector = (state: ReactFlowState) => {
  const nodes: Record<
    string,
    { x: number; y: number; width: number; height: number }
  > = {};
  for (const [id, node] of state.nodeInternals) {
    nodes[id] = {
      x: node.positionAbsolute?.x ?? node.position.x,
      y: node.positionAbsolute?.y ?? node.position.y,
      width: node.width ?? NODE_WIDTH,
      height: node.height ?? NODE_MIN_HEIGHT,
    };
  }
  return nodes;
};

/**
 * SmartEdge - A custom edge that automatically connects to the nearest sides of nodes.
 *
 * Features:
 * - Sharp/stepped path routing with 90-degree angles
 * - Dynamic connection points that update as nodes move
 * - Modern styling with larger connectors and thicker edges
 * - Animated connector dots at connection points
 */
export const SmartEdge = memo(
  ({
    id,
    source,
    target,
    sourceX: _sourceX,
    sourceY: _sourceY,
    targetX: _targetX,
    targetY: _targetY,
    sourcePosition: _sourcePosition,
    targetPosition: _targetPosition,
    style = {},
    markerEnd,
    label,
    labelStyle,
    labelShowBg = true,
    labelBgStyle,
    selected,
  }: EdgeProps) => {
    const nodePositions = useStore(nodesSelector);
    const sourceNodePos = nodePositions[source];
    const targetNodePos = nodePositions[target];

    const { path, labelX, labelY, sourceX, sourceY, targetX, targetY } =
      useMemo(() => {
        if (!sourceNodePos || !targetNodePos) {
          // Fallback to provided coordinates
          const [edgePath, edgeLabelX, edgeLabelY] = getSmoothStepPath({
            sourceX: _sourceX,
            sourceY: _sourceY,
            sourcePosition: _sourcePosition,
            targetX: _targetX,
            targetY: _targetY,
            targetPosition: _targetPosition,
            borderRadius: 0,
            offset: EDGE_OFFSET,
          });
          return {
            path: edgePath,
            labelX: edgeLabelX,
            labelY: edgeLabelY,
            sourceX: _sourceX,
            sourceY: _sourceY,
            targetX: _targetX,
            targetY: _targetY,
          };
        }

        // Get actual node dimensions
        const sourceRect: NodeRect = {
          x: sourceNodePos.x,
          y: sourceNodePos.y,
          width: sourceNodePos.width,
          height: sourceNodePos.height,
        };

        const targetRect: NodeRect = {
          x: targetNodePos.x,
          y: targetNodePos.y,
          width: targetNodePos.width,
          height: targetNodePos.height,
        };

        // Calculate best connection points
        const {
          sourceX: calcSourceX,
          sourceY: calcSourceY,
          targetX: calcTargetX,
          targetY: calcTargetY,
          sourcePosition,
          targetPosition,
        } = getBestConnectionPoints(sourceRect, targetRect);

        // Generate the edge path with sharp corners (borderRadius: 0)
        const [edgePath, edgeLabelX, edgeLabelY] = getSmoothStepPath({
          sourceX: calcSourceX,
          sourceY: calcSourceY,
          sourcePosition,
          targetX: calcTargetX,
          targetY: calcTargetY,
          targetPosition,
          borderRadius: 0,
          offset: EDGE_OFFSET,
        });

        return {
          path: edgePath,
          labelX: edgeLabelX,
          labelY: edgeLabelY,
          sourceX: calcSourceX,
          sourceY: calcSourceY,
          targetX: calcTargetX,
          targetY: calcTargetY,
        };
      }, [
        sourceNodePos,
        targetNodePos,
        _sourceX,
        _sourceY,
        _targetX,
        _targetY,
        _sourcePosition,
        _targetPosition,
      ]);

    // Get colors from style or use defaults
    const strokeColor = (style.stroke as string) || "#6366f1";
    const isSelected = selected;

    return (
      <g className="react-flow__edge-smart">
        {/* Invisible wider path for easier selection */}
        <path
          d={path}
          fill="none"
          strokeWidth={20}
          stroke="transparent"
          className="react-flow__edge-interaction"
        />

        {/* Glow effect for selected/hover state */}
        {isSelected && (
          <path
            d={path}
            fill="none"
            strokeWidth={EDGE_STROKE_WIDTH + 6}
            stroke={strokeColor}
            strokeOpacity={0.3}
            className="react-flow__edge-glow"
          />
        )}

        {/* Main edge path */}
        <path
          id={id}
          className="react-flow__edge-path"
          d={path}
          fill="none"
          strokeWidth={EDGE_STROKE_WIDTH}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "stroke 0.2s ease, stroke-width 0.2s ease",
            ...style,
            strokeWidth: isSelected ? EDGE_STROKE_WIDTH + 1 : EDGE_STROKE_WIDTH,
          }}
          markerEnd={markerEnd}
        />

        {/* Source connector dot */}
        <circle
          cx={sourceX}
          cy={sourceY}
          r={isSelected ? CONNECTOR_SIZE / 2 + 1 : CONNECTOR_SIZE / 2}
          fill={strokeColor}
          stroke="var(--background)"
          strokeWidth={2}
          className="react-flow__edge-connector"
          style={{
            transition: "r 0.2s ease, fill 0.2s ease",
            filter: isSelected
              ? `drop-shadow(0 0 4px ${strokeColor})`
              : undefined,
          }}
        />

        {/* Target connector dot */}
        <circle
          cx={targetX}
          cy={targetY}
          r={isSelected ? CONNECTOR_SIZE / 2 + 1 : CONNECTOR_SIZE / 2}
          fill={strokeColor}
          stroke="var(--background)"
          strokeWidth={2}
          className="react-flow__edge-connector"
          style={{
            transition: "r 0.2s ease, fill 0.2s ease",
            filter: isSelected
              ? `drop-shadow(0 0 4px ${strokeColor})`
              : undefined,
          }}
        />

        {/* Label */}
        {label && (
          <foreignObject
            width={120}
            height={32}
            x={labelX - 60}
            y={labelY - 16}
            className="react-flow__edge-label"
            requiredExtensions="http://www.w3.org/1999/xhtml"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: labelShowBg
                    ? "var(--background)"
                    : "transparent",
                  border: labelShowBg ? "1px solid var(--border)" : "none",
                  boxShadow: labelShowBg ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                  ...labelBgStyle,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: strokeColor,
                    letterSpacing: "0.02em",
                    ...labelStyle,
                  }}
                >
                  {label}
                </span>
              </div>
            </div>
          </foreignObject>
        )}
      </g>
    );
  },
);

SmartEdge.displayName = "SmartEdge";
