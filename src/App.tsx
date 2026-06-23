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

type OutcomeNodeData = {
  eyebrow: string;
  title: string;
  owner: string;
  metric: string;
  denominator: string;
  engineeringWork: string;
  confidence: number;
  status: 'Healthy' | 'Watch' | 'Gap';
};

type OutcomeNode = Node<OutcomeNodeData, 'outcome'>;

const nodes: OutcomeNode[] = [
  {
    id: 'reach',
    type: 'outcome',
    position: { x: -720, y: -260 },
    data: {
      eyebrow: 'Commercial reach',
      title: 'Right customers bought Feature 1 and Feature 2',
      owner: 'RevOps + Sales',
      metric: '68% ICP entitlement coverage',
      denominator: 'Target accounts with identified need',
      engineeringWork: 'Entitlement flags confirm what each account can use',
      confidence: 76,
      status: 'Healthy',
    },
  },
  {
    id: 'price',
    type: 'outcome',
    position: { x: -720, y: 20 },
    data: {
      eyebrow: 'Commercial reach',
      title: 'Price realised for placeholder feature set',
      owner: 'RevOps',
      metric: '91% packaged with clear scope',
      denominator: 'Closed-won contracts with Feature 1 or Feature 2',
      engineeringWork: 'SKU-to-capability mapping keeps sold scope deployable',
      confidence: 62,
      status: 'Watch',
    },
  },
  {
    id: 'activation',
    type: 'outcome',
    position: { x: -330, y: -150 },
    data: {
      eyebrow: 'Customer activation',
      title: 'Customers live with purchased features',
      owner: 'Implementation + Engineering',
      metric: '74% deployable in 60 days',
      denominator: 'Entitled customers past contract start',
      engineeringWork: 'Provisioning, integrations, and migration blockers cleared',
      confidence: 58,
      status: 'Watch',
    },
  },
  {
    id: 'configuration',
    type: 'outcome',
    position: { x: -330, y: 140 },
    data: {
      eyebrow: 'Customer activation',
      title: 'Feature 1 configured and ready to use',
      owner: 'Engineering + Product Ops',
      metric: '52% ready-to-use configuration',
      denominator: 'Live customers with Feature 1 entitlement',
      engineeringWork: 'Configuration defaults and data quality checks completed',
      confidence: 44,
      status: 'Gap',
    },
  },
  {
    id: 'engagement',
    type: 'outcome',
    position: { x: 90, y: -35 },
    data: {
      eyebrow: 'Customer engagement',
      title: 'Feature 1 engagement rate',
      owner: 'Product Engineering + Analytics',
      metric: '39% meaningful use / eligible users',
      denominator: 'Feature 1 usage events ÷ Feature 1 eligible population',
      engineeringWork: 'Instrumentation proves the right user action happened',
      confidence: 69,
      status: 'Watch',
    },
  },
  {
    id: 'breadth',
    type: 'outcome',
    position: { x: 500, y: -260 },
    data: {
      eyebrow: 'Breadth of engagement',
      title: 'Eligible accounts using Feature 1 or Feature 2',
      owner: 'CS + Product Engineering',
      metric: '46% live accounts with repeated use',
      denominator: 'Accounts live with purchased placeholder feature',
      engineeringWork: 'Reliability and account-level adoption signals visible',
      confidence: 71,
      status: 'Healthy',
    },
  },
  {
    id: 'frequency',
    type: 'outcome',
    position: { x: 500, y: 20 },
    data: {
      eyebrow: 'Depth of engagement',
      title: 'Recurring weekly Feature 2 usage by target users',
      owner: 'Product Engineering',
      metric: '2.1 active weeks per month',
      denominator: 'Target users in eligible accounts',
      engineeringWork: 'Workflow friction and performance issues reduced',
      confidence: 49,
      status: 'Gap',
    },
  },
  {
    id: 'value',
    type: 'outcome',
    position: { x: 900, y: -120 },
    data: {
      eyebrow: 'Value realisation',
      title: 'Customers generate the value we promised',
      owner: 'Exec + Engineering + RevOps',
      metric: '£18.4m tied to value milestones',
      denominator: 'Accounts reaching defined value milestone',
      engineeringWork: 'Outcome evidence is traceable back to shipped capabilities',
      confidence: 64,
      status: 'Watch',
    },
  },
  {
    id: 'renewal',
    type: 'outcome',
    position: { x: 900, y: 165 },
    data: {
      eyebrow: 'Board signal',
      title: 'Health, expansion and renewal confidence',
      owner: 'Revenue + Product Leadership',
      metric: '112% NRR with proven adoption',
      denominator: 'Renewing ARR with proven value realised',
      engineeringWork: 'Roadmap confidence reflects adoption and value gaps',
      confidence: 73,
      status: 'Healthy',
    },
  },
];

const edges: Edge[] = [
  { id: 'reach-activation', source: 'reach', target: 'activation', label: 'entitles', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'price-activation', source: 'price', target: 'activation', label: 'packages', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'activation-engagement', source: 'activation', target: 'engagement', label: 'eligible to use', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'configuration-engagement', source: 'configuration', target: 'engagement', label: 'usable setup', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'engagement-breadth', source: 'engagement', target: 'breadth', label: 'breadth rate', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'engagement-frequency', source: 'engagement', target: 'frequency', label: 'depth rate', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'breadth-value', source: 'breadth', target: 'value', label: 'proves reach', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'frequency-value', source: 'frequency', target: 'value', label: 'proves habit', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'value-renewal', source: 'value', target: 'renewal', label: 'board outcome', markerEnd: { type: MarkerType.ArrowClosed } },
];

function OutcomeCard({ data }: NodeProps<OutcomeNode>) {
  return (
    <article className="flow-card">
      <Handle type="target" position={Position.Left} className="node-handle" />
      <div className="flow-card__header">
        <span>{data.eyebrow}</span>
        <strong className={`status ${data.status.toLowerCase()}`}>{data.status}</strong>
      </div>
      <h3>{data.title}</h3>
      <div className="metric-grid">
        <div>
          <small>Owner</small>
          <b>{data.owner}</b>
        </div>
        <div>
          <small>Value-stream signal</small>
          <b>{data.metric}</b>
        </div>
      </div>
      <p className="engineering-work"><strong>Engineering work:</strong> {data.engineeringWork}</p>
      <p className="denominator"><strong>Eligible population:</strong> {data.denominator}</p>
      <div className="confidence" aria-label={`${data.confidence}% confidence`}>
        <span style={{ width: `${data.confidence}%` }} />
      </div>
      <Handle type="source" position={Position.Right} className="node-handle" />
    </article>
  );
}

const nodeTypes = { outcome: OutcomeCard };

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
          <h1>Feature Value Realisation Map</h1>
          <p>Follow the value stream from sold entitlement through engineering enablement, activation, meaningful usage, value evidence, and renewal confidence.</p>
        </Panel>
        <Background color="#cbd5e1" gap={30} size={1.3} variant={BackgroundVariant.Dots} />
        <MiniMap pannable zoomable position="bottom-left" nodeStrokeWidth={3} />
        <Controls position="bottom-right" />
      </ReactFlow>
    </main>
  );
}
