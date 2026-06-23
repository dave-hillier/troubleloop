import '@xyflow/react/dist/style.css';
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';

type TreeLayer = 'Opportunity' | 'Solution' | 'Trailing measure';

type ValueTreeNodeData = {
  layer: TreeLayer;
  title: string;
  description: string;
  owner: string;
  signal: string;
  status: 'Healthy' | 'Watch' | 'Gap';
};

type ValueTreeNode = Node<ValueTreeNodeData, 'valueTree'>;

const nodes: ValueTreeNode[] = [
  {
    id: 'opp-fit',
    type: 'valueTree',
    position: { x: -760, y: -260 },
    data: {
      layer: 'Opportunity',
      title: 'Target customers have an unmet workflow need',
      description: 'There is a clear segment where Feature 1 or Feature 2 should remove manual work, risk, or delay.',
      owner: 'Product + RevOps',
      signal: 'ICP accounts with named pain and entitlement potential',
      status: 'Healthy',
    },
  },
  {
    id: 'opp-activation',
    type: 'valueTree',
    position: { x: -760, y: 40 },
    data: {
      layer: 'Opportunity',
      title: 'Purchased customers are not yet able to realise value',
      description: 'Value is blocked when customers have entitlement but still need setup, data, integration, or workflow readiness.',
      owner: 'Implementation + Product Ops',
      signal: 'Entitled accounts waiting on readiness work',
      status: 'Watch',
    },
  },
  {
    id: 'solution-entitlement',
    type: 'valueTree',
    position: { x: -320, y: -310 },
    data: {
      layer: 'Solution',
      title: 'Entitlement and packaging model',
      description: 'Map sold packages to capabilities so teams know who should have access and what needs to be provisioned.',
      owner: 'Engineering + RevOps',
      signal: 'Feature entitlement flags available by account',
      status: 'Healthy',
    },
  },
  {
    id: 'solution-readiness',
    type: 'valueTree',
    position: { x: -320, y: 0 },
    data: {
      layer: 'Solution',
      title: 'Activation readiness path',
      description: 'Clear provisioning, configuration, migration, and integration steps that turn entitlement into a usable feature.',
      owner: 'Engineering + Implementation',
      signal: 'Readiness checklist completed before launch',
      status: 'Gap',
    },
  },
  {
    id: 'solution-usage',
    type: 'valueTree',
    position: { x: -320, y: 310 },
    data: {
      layer: 'Solution',
      title: 'Meaningful usage instrumentation',
      description: 'Instrument the product actions that prove customers completed the workflow the feature exists to improve.',
      owner: 'Product Engineering + Analytics',
      signal: 'Tracked events match the intended value moment',
      status: 'Watch',
    },
  },
  {
    id: 'measure-activation',
    type: 'valueTree',
    position: { x: 150, y: -180 },
    data: {
      layer: 'Trailing measure',
      title: 'Activation rate',
      description: 'Customers who became live with the capabilities they bought after the readiness work was completed.',
      owner: 'Implementation Leadership',
      signal: '74% live within 60 days of contract start',
      status: 'Watch',
    },
  },
  {
    id: 'measure-engagement',
    type: 'valueTree',
    position: { x: 150, y: 140 },
    data: {
      layer: 'Trailing measure',
      title: 'Meaningful engagement rate',
      description: 'Eligible users or accounts repeatedly completing the product action that indicates the workflow improved.',
      owner: 'Product + Customer Success',
      signal: '39% meaningful usage across eligible population',
      status: 'Gap',
    },
  },
  {
    id: 'measure-value',
    type: 'valueTree',
    position: { x: 600, y: -20 },
    data: {
      layer: 'Trailing measure',
      title: 'Value realised and renewal confidence',
      description: 'Accounts where activation and engagement evidence supports value claims, expansion, and renewal confidence.',
      owner: 'Exec + Revenue Leadership',
      signal: '112% NRR forecast where value evidence exists',
      status: 'Healthy',
    },
  },
];

const edges: Edge[] = [
  { id: 'opp-fit-solution-entitlement', source: 'opp-fit', target: 'solution-entitlement', label: 'defines access', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'opp-fit-solution-usage', source: 'opp-fit', target: 'solution-usage', label: 'defines value moment', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'opp-activation-solution-readiness', source: 'opp-activation', target: 'solution-readiness', label: 'reveals blockers', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'solution-entitlement-measure-activation', source: 'solution-entitlement', target: 'measure-activation', label: 'enables', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'solution-readiness-measure-activation', source: 'solution-readiness', target: 'measure-activation', label: 'unblocks', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'solution-readiness-measure-engagement', source: 'solution-readiness', target: 'measure-engagement', label: 'makes usable', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'solution-usage-measure-engagement', source: 'solution-usage', target: 'measure-engagement', label: 'measures', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'measure-activation-measure-value', source: 'measure-activation', target: 'measure-value', label: 'precedes value', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'measure-engagement-measure-value', source: 'measure-engagement', target: 'measure-value', label: 'proves use', markerEnd: { type: MarkerType.ArrowClosed } },
];

function ValueTreeCard({ data }: NodeProps<ValueTreeNode>) {
  return (
    <article className={`flow-card flow-card--${data.layer.toLowerCase().replace(' ', '-')}`}>
      <Handle type="target" position={Position.Left} className="node-handle" />
      <div className="flow-card__header">
        <span>{data.layer}</span>
        <strong className={`status ${data.status.toLowerCase()}`}>{data.status}</strong>
      </div>
      <h3>{data.title}</h3>
      <p className="card-description">{data.description}</p>
      <div className="metric-grid">
        <div>
          <small>Owner</small>
          <b>{data.owner}</b>
        </div>
        <div>
          <small>{data.layer === 'Trailing measure' ? 'Measure' : 'Signal'}</small>
          <b>{data.signal}</b>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="node-handle" />
    </article>
  );
}

const nodeTypes = { valueTree: ValueTreeCard };

export default function App() {
  return (
    <main className="prototype-canvas" aria-label="Full-page value realisation prototype">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.35}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#2563eb', strokeWidth: 2.5 },
          labelStyle: { fill: '#1d4ed8', fontWeight: 900 },
          labelBgPadding: [10, 5],
          labelBgBorderRadius: 999,
          labelBgStyle: { fill: '#eff6ff' },
        }}
      >
        <Panel position="top-left" className="canvas-panel">
          <h1>Value Realisation Tree</h1>
          <p>Separate the opportunity, the solution work, and the trailing measures so the map shows why teams are building before it reports what happened.</p>
        </Panel>
        <Background color="#cbd5e1" gap={30} size={1.3} variant={BackgroundVariant.Dots} />
        <MiniMap pannable zoomable position="bottom-left" nodeStrokeWidth={3} />
        <Controls position="bottom-right" />
      </ReactFlow>
    </main>
  );
}
