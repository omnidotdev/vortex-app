import { memo, useMemo } from "react";
import { Position, getSmoothStepPath, useStore } from "reactflow";

import type { EdgeProps, ReactFlowState } from "reactflow";

/** Node dimensions for edge calculations */
const NODE_WIDTH = 270;
const NODE_MIN_HEIGHT = 120;

/** Edge styling constants */
const EDGE_STROKE_WIDTH = 3;
const EDGE_OFFSET = 20;

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

  let bestPair = positionPairs[0]!;
  let bestScore = Infinity;

  for (const pair of positionPairs) {
    const dist = distance(pair.source, pair.target);
    let penalty = 0;

    if (pair.sourcePos === Position.Bottom && pair.targetPos === Position.Top) {
      if (targetRect.y > sourceRect.y + sourceRect.height) {
        penalty -= 50;
      }
    }
    if (pair.sourcePos === Position.Top && pair.targetPos === Position.Bottom) {
      if (targetRect.y + targetRect.height < sourceRect.y) {
        penalty -= 50;
      }
    }
    if (pair.sourcePos === Position.Right && pair.targetPos === Position.Left) {
      if (targetRect.x > sourceRect.x + sourceRect.width) {
        penalty -= 50;
      }
    }
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

// Selector for source and target node positions only
const createEdgePositionsSelector = (sourceId: string, targetId: string) => {
  let prevResult: {
    source: NodeRect | null;
    target: NodeRect | null;
  } | null = null;

  return (state: ReactFlowState) => {
    const sourceNode = state.nodeInternals.get(sourceId);
    const targetNode = state.nodeInternals.get(targetId);

    const source = sourceNode
      ? {
          x: sourceNode.positionAbsolute?.x ?? sourceNode.position.x,
          y: sourceNode.positionAbsolute?.y ?? sourceNode.position.y,
          width: sourceNode.width ?? NODE_WIDTH,
          height: sourceNode.height ?? NODE_MIN_HEIGHT,
        }
      : null;

    const target = targetNode
      ? {
          x: targetNode.positionAbsolute?.x ?? targetNode.position.x,
          y: targetNode.positionAbsolute?.y ?? targetNode.position.y,
          width: targetNode.width ?? NODE_WIDTH,
          height: targetNode.height ?? NODE_MIN_HEIGHT,
        }
      : null;

    // Return same reference if positions haven't changed
    if (
      prevResult &&
      prevResult.source?.x === source?.x &&
      prevResult.source?.y === source?.y &&
      prevResult.target?.x === target?.x &&
      prevResult.target?.y === target?.y
    ) {
      return prevResult;
    }

    prevResult = { source, target };
    return prevResult;
  };
};

/**
 * SmartEdge - A custom edge that automatically connects to the nearest sides of nodes.
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
    // Memoize the selector so it's not recreated on every render
    const selector = useMemo(
      () => createEdgePositionsSelector(source, target),
      [source, target],
    );
    const { source: sourceNodePos, target: targetNodePos } = useStore(selector);

    let path: string;
    let labelX: number;
    let labelY: number;

    if (!sourceNodePos || !targetNodePos) {
      // Fallback to provided coordinates
      [path, labelX, labelY] = getSmoothStepPath({
        sourceX: _sourceX,
        sourceY: _sourceY,
        sourcePosition: _sourcePosition,
        targetX: _targetX,
        targetY: _targetY,
        targetPosition: _targetPosition,
        borderRadius: 0,
        offset: EDGE_OFFSET,
      });
    } else {
      // Calculate best connection points
      const {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
      } = getBestConnectionPoints(sourceNodePos, targetNodePos);

      [path, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 0,
        offset: EDGE_OFFSET,
      });
    }

    const strokeColor = (style.stroke as string) || "#6366f1";

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

        {/* Glow effect for selected state */}
        {selected && (
          <path
            d={path}
            fill="none"
            strokeWidth={EDGE_STROKE_WIDTH + 6}
            stroke={strokeColor}
            strokeOpacity={0.3}
          />
        )}

        {/* Main edge path */}
        <path
          id={id}
          className="react-flow__edge-path"
          d={path}
          fill="none"
          strokeWidth={selected ? EDGE_STROKE_WIDTH + 1 : EDGE_STROKE_WIDTH}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
          markerEnd={markerEnd}
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
