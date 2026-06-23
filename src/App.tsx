import '@xyflow/react/dist/style.css';
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
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
  confidence: number;
  status: 'On track' | 'At risk' | 'Needs focus';
};

type OutcomeNode = Node<OutcomeNodeData, 'outcome'>;

const nodes: OutcomeNode[] = [
  {
    id: 'campaigns',
    type: 'outcome',
    position: { x: -580, y: -220 },
    data: {
      eyebrow: 'Team work',
      title: 'New onboarding campaign',
      owner: 'Lifecycle',
      metric: '+18% activation',
      confidence: 72,
      status: 'On track',
    },
  },
  {
    id: 'research',
    type: 'outcome',
    position: { x: -580, y: -40 },
    data: {
      eyebrow: 'Insight',
      title: 'Social collaboration gaps',
      owner: 'Research',
      metric: '42 interviews',
      confidence: 61,
      status: 'At risk',
    },
  },
  {
    id: 'notifications',
    type: 'outcome',
    position: { x: -580, y: 140 },
    data: {
      eyebrow: 'Team work',
      title: 'Trial-period notifications',
      owner: 'Growth',
      metric: '+9% conversion',
      confidence: 83,
      status: 'On track',
    },
  },
  {
    id: 'sales',
    type: 'outcome',
    position: { x: -250, y: -170 },
    data: {
      eyebrow: 'Business driver',
      title: 'Premium trial users',
      owner: 'Revenue',
      metric: '$2.1M pipeline',
      confidence: 68,
      status: 'On track',
    },
  },
  {
    id: 'weekly',
    type: 'outcome',
    position: { x: -250, y: 20 },
    data: {
      eyebrow: 'Behavior driver',
      title: 'Avg. sessions per week',
      owner: 'Product',
      metric: '3.8 sessions',
      confidence: 54,
      status: 'Needs focus',
    },
  },
  {
    id: 'central',
    type: 'outcome',
    position: { x: 90, y: -35 },
    data: {
      eyebrow: 'Company outcome',
      title: 'Triple paid listening in music by subscribers',
      owner: 'Executive team',
      metric: '122% NRR target',
      confidence: 76,
      status: 'On track',
    },
  },
  {
    id: 'arpu',
    type: 'outcome',
    position: { x: 520, y: -185 },
    data: {
      eyebrow: 'Business driver',
      title: '+ ARPU',
      owner: 'Monetization',
      metric: '+$4.20 / user',
      confidence: 59,
      status: 'At risk',
    },
  },
  {
    id: 'monthly',
    type: 'outcome',
    position: { x: 520, y: 5 },
    data: {
      eyebrow: 'Product bet',
      title: 'Monthly extended sessions',
      owner: 'Engagement',
      metric: '+1.4 sessions',
      confidence: 81,
      status: 'On track',
    },
  },
  {
    id: 'premium',
    type: 'outcome',
    position: { x: 520, y: 195 },
    data: {
      eyebrow: 'Business outcome',
      title: 'Monthly premium subscriptions',
      owner: 'Subscriptions',
      metric: '+24K net adds',
      confidence: 66,
      status: 'On track',
    },
  },
];

const edges: Edge[] = [
  { id: 'campaigns-sales', source: 'campaigns', target: 'sales', label: 'lifts', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'research-weekly', source: 'research', target: 'weekly', label: 'explains', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'notifications-weekly', source: 'notifications', target: 'weekly', label: 'moves', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'sales-central', source: 'sales', target: 'central', label: '$$$', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'weekly-central', source: 'weekly', target: 'central', label: 'drives', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'central-arpu', source: 'central', target: 'arpu', label: 'rolls up', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'central-monthly', source: 'central', target: 'monthly', label: 'expands', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'central-premium', source: 'central', target: 'premium', label: 'converts', markerEnd: { type: MarkerType.ArrowClosed } },
];

function OutcomeCard({ data }: NodeProps<OutcomeNode>) {
  return (
    <article className="flow-card">
      <Handle type="target" position={Position.Left} className="node-handle" />
      <div className="flow-card__header">
        <span>{data.eyebrow}</span>
        <strong className={`status ${data.status.toLowerCase().replaceAll(' ', '-')}`}>{data.status}</strong>
      </div>
      <h3>{data.title}</h3>
      <div className="metric-grid">
        <div>
          <small>Owner</small>
          <b>{data.owner}</b>
        </div>
        <div>
          <small>Metric</small>
          <b>{data.metric}</b>
        </div>
      </div>
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
    <main className="page-shell">
      <section className="brand-hero">
        <div className="loop-mark" aria-hidden="true">∞</div>
        <p className="eyebrow">Troubleloop</p>
        <h1>DoubleLoop-style outcome mapping for modern teams.</h1>
        <p>
          A React Flow canvas that shows how experiments, insights, and team work connect to the
          business outcomes leaders care about.
        </p>
      </section>

      <section className="canvas-shell" aria-label="React Flow outcome cascade">
        <div className="canvas-toolbar">
          <div>
            <p className="eyebrow">Example: music subscription service</p>
            <h2>Business outcome cascade</h2>
          </div>
          <span>React Flow canvas</span>
        </div>
        <div className="flow-wrap">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.35}
            maxZoom={1.5}
            defaultEdgeOptions={{
              type: 'smoothstep',
              animated: true,
              style: { stroke: '#16a085', strokeWidth: 2.5 },
              labelStyle: { fill: '#0c7c66', fontWeight: 800 },
              labelBgPadding: [8, 4],
              labelBgBorderRadius: 999,
              labelBgStyle: { fill: '#e6fff8' },
            }}
          >
            <Background color="#ccd6e2" gap={28} size={1.4} variant={BackgroundVariant.Dots} />
            <Controls position="bottom-right" />
          </ReactFlow>
        </div>
      </section>
    </main>
  );
}
