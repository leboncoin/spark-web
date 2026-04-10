/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import '@xyflow/react/dist/style.css'
import {
  Background,
  Controls,
  type Edge,
  Handle,
  MiniMap,
  type Node,
  type NodeProps,
  Position,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react'
import { cx } from 'class-variance-authority'
import { memo, useEffect, useMemo, useRef } from 'react'

export interface DecisionTreeNode {
  id: string
  question?: string
  label?: string
  component?: string
  children?: DecisionTreeNode[]
}

interface ComponentInfo {
  name: string
  href: string
}

// ---- Layout constants ----

const NODE_W = 180
const COL_W = 270
const LEAF_SPACING = 52

// ---- Layout algorithm ----

interface PositionedNodeData {
  id: string
  x: number
  y: number
  level: number
  isLeaf: boolean
  label: string
  component?: string
}

function computeLayout(
  node: DecisionTreeNode,
  depth: number,
  positionedNodes: PositionedNodeData[],
  edges: Edge[],
  leafCounter: { value: number },
  parentId?: string,
  childIndex?: number
): number {
  const isLeaf = !node.children || node.children.length === 0

  if (isLeaf) {
    const y = leafCounter.value * LEAF_SPACING
    leafCounter.value++

    positionedNodes.push({
      id: node.id,
      x: depth * COL_W,
      y,
      level: depth,
      isLeaf: true,
      label: node.label || node.component || node.id,
      component: node.component,
    })

    if (parentId) {
      edges.push({
        id: `e-${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        type: 'smoothstep',
        data: { isYes: childIndex === 0, isRootEdge: parentId === 'root' },
      })
    }

    return y
  }

  const childYs: number[] = node.children!.map((child, idx) =>
    computeLayout(child, depth + 1, positionedNodes, edges, leafCounter, node.id, idx)
  )

  const y = ((childYs[0] ?? 0) + (childYs[childYs.length - 1] ?? 0)) / 2

  positionedNodes.push({
    id: node.id,
    x: depth * COL_W,
    y,
    level: depth,
    isLeaf: false,
    label: node.question || node.label || node.id,
    component: undefined,
  })

  if (parentId) {
    edges.push({
      id: `e-${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      type: 'smoothstep',
      data: { isYes: childIndex === 0, isRootEdge: parentId === 'root' },
    })
  }

  return y
}

// ---- Flow controller (must be inside <ReactFlow>) ----

function FlowController({ focusNodeId }: { focusNodeId?: string }) {
  const reactFlow = useReactFlow()
  const prevIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!focusNodeId || focusNodeId === prevIdRef.current) return
    prevIdRef.current = focusNodeId

    const allNodes = reactFlow.getNodes()
    const allEdges = reactFlow.getEdges()
    const currentNode = allNodes.find(n => n.id === focusNodeId)
    if (!currentNode) return

    const childIds = allEdges.filter(e => e.source === focusNodeId).map(e => e.target)
    const isLeaf = childIds.length === 0

    const focusNodes = isLeaf
      ? [currentNode]
      : allNodes.filter(n => n.id === focusNodeId || childIds.includes(n.id))

    setTimeout(() => {
      reactFlow.fitView({
        nodes: focusNodes,
        duration: 550,
        padding: isLeaf ? 1.2 : 0.5,
        maxZoom: isLeaf ? 1.6 : 1.1,
        minZoom: 0.15,
      })
    }, 30)
  }, [focusNodeId, reactFlow])

  return null
}

// ---- Custom node components ----

const HANDLE_STYLE: React.CSSProperties = { visibility: 'hidden', pointerEvents: 'none' }

const baseNodeStyle: React.CSSProperties = {
  width: NODE_W,
  borderRadius: 8,
  padding: '8px 16px',
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 600,
  cursor: 'default',
  transition: 'box-shadow 0.2s ease',
}

const RootNode = memo(({ data }: NodeProps) => (
  <div
    className={cx(
      'sb-unstyled bg-main text-on-main shadow-md',
      (data.isCurrent as boolean) && 'ring-main ring-2 ring-offset-2'
    )}
    style={{ ...baseNodeStyle, fontWeight: 700, borderRadius: 8 }}
  >
    <Handle type="source" position={Position.Right} style={HANDLE_STYLE} />
    {data.label as string}
  </div>
))
RootNode.displayName = 'RootNode'

const DecisionNode = memo(({ data }: NodeProps) => (
  <div
    className={cx(
      'sb-unstyled bg-surface text-on-surface',
      data.isCurrent || data.isOnPath
        ? 'ring-main border-0 ring-2 ring-offset-2'
        : 'border-outline border-sm'
    )}
    style={baseNodeStyle}
  >
    <Handle type="target" position={Position.Left} style={HANDLE_STYLE} />
    <Handle type="source" position={Position.Right} style={HANDLE_STYLE} />
    {data.label as string}
  </div>
))
DecisionNode.displayName = 'DecisionNode'

const ComponentNode = memo(({ data }: NodeProps) => (
  <a
    href={data.href as string | undefined}
    className={cx(
      'sb-unstyled block transition-colors',
      (data.isCurrent as boolean)
        ? 'bg-main text-on-main'
        : 'bg-main-container text-on-main-container'
    )}
    style={{ ...baseNodeStyle, display: 'block', textDecoration: 'none' }}
  >
    <Handle type="target" position={Position.Left} style={HANDLE_STYLE} />
    {data.label as string}
  </a>
))
ComponentNode.displayName = 'ComponentNode'

const nodeTypes = {
  root: RootNode,
  decision: DecisionNode,
  component: ComponentNode,
}

// ---- Main component ----

interface Props {
  tree: DecisionTreeNode
  components: ComponentInfo[]
  /** Node ID to zoom/center to (controlled from outside) */
  focusNodeId?: string
  /** IDs of nodes on the active navigation path (others are dimmed) */
  activePath?: string[]
  /** When true, removes own border/rounded and uses 100% height (for embedding) */
  embedded?: boolean
}

export function ComponentDecisionTree({
  tree,
  components,
  focusNodeId,
  activePath,
  embedded = false,
}: Props) {
  const { nodes, edges } = useMemo(() => {
    const positionedNodes: PositionedNodeData[] = []
    const edges: Edge[] = []
    const leafCounter = { value: 0 }

    computeLayout(tree, 0, positionedNodes, edges, leafCounter)

    const nodes: Node[] = positionedNodes.map(n => {
      const compInfo = n.component ? components.find(c => c.name === n.component) : undefined
      const isOnPath = activePath ? activePath.includes(n.id) : true
      const isCurrent = focusNodeId === n.id

      let type: string
      if (n.level === 0) type = 'root'
      else if (n.isLeaf) type = 'component'
      else type = 'decision'

      return {
        id: n.id,
        position: { x: n.x, y: n.y },
        type,
        data: {
          label: n.label,
          href: compInfo?.href,
          component: n.component,
          isCurrent,
          isOnPath,
        },
        style: {
          opacity: 1,
          transition: 'opacity 0.35s ease',
        },
        draggable: false,
      }
    })

    const styledEdges: Edge[] = edges.map(e => {
      const isRootEdge = Boolean(e.data?.isRootEdge)
      const isOnPath = activePath
        ? activePath.includes(e.source) && activePath.includes(e.target)
        : true

      let edgeLabel: string | undefined
      if (!isRootEdge) edgeLabel = e.data?.isYes ? 'Yes' : 'No'

      return {
        ...e,
        label: edgeLabel,
        labelStyle: {
          fill: isOnPath ? 'var(--color-on-main, #094171)' : 'var(--color-on-surface, #ffffff)',
          fontWeight: 700,
          fontSize: 10,
        },
        labelShowBg: true,
        labelBgStyle: {
          fill: isOnPath ? 'var(--color-main, #ffffff)' : 'var(--color-neutral-container, #ffffff)',
        },
        labelBgPadding: [8, 4] as [number, number],
        labelBgBorderRadius: 4,
        style: {
          zIndex: isOnPath ? 'var(--z-index-raised)' : -1,
          stroke: isOnPath ? 'var(--color-main, #094171)' : 'var(--color-outline, #ffffff)',
          strokeWidth: isOnPath ? 2 : 1,
          opacity: 1,
          transition: 'opacity 0.35s ease, stroke-width 0.35s ease',
        },
      }
    })

    return { nodes, edges: styledEdges }
  }, [tree, components, focusNodeId, activePath])

  const containerStyle: React.CSSProperties = embedded
    ? { width: '100%', height: '100%' }
    : {
        width: '100%',
        height: 720,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'var(--colors-neutral-container)',
      }

  return (
    <div className="sb-unstyled" style={containerStyle}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        panOnScroll
        zoomOnScroll={false}
        minZoom={0.15}
        maxZoom={1.6}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <FlowController focusNodeId={focusNodeId} />
        <Background gap={16} size={1} color="var(--colors-neutral-container)" />
        <Controls showInteractive={false} />
        {!embedded && (
          <MiniMap
            nodeColor={n => {
              if (n.type === 'root') return 'var(--colors-main)'
              if (n.type === 'decision') return 'var(--color-support, #094171)'

              return 'var(--colors-neutral-container)'
            }}
            maskColor="rgba(255,255,255,0.6)"
            style={{ borderRadius: 8 }}
          />
        )}
      </ReactFlow>
    </div>
  )
}
