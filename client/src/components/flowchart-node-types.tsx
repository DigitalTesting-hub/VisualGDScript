import { Handle, Position } from 'reactflow';

const NodeWrapper = ({ color, children }: any) => (
  <div className={`px-3 py-2 shadow-md rounded-md ${color} text-white text-xs font-medium`}>
    <Handle type="target" position={Position.Top} id="top" />
    {children}
    <Handle type="source" position={Position.Bottom} id="bottom" />
    <Handle type="source" position={Position.Right} id="right" />
    <Handle type="target" position={Position.Left} id="left-target" />
  </div>
);

/**
 * START NODE - Only has one bottom handle (source only)
 */
export function StartNode({ data }: any) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-600 text-white text-sm font-bold">
      {data.label}
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}

export function EventNode({ data }: any) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-500 text-white text-sm font-medium">
      <Handle type="target" position={Position.Top} id="top" />
      {data.label}
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="target" position={Position.Left} id="left-target" />
    </div>
  );
}

export function MovementNode({ data }: any) {
  return <NodeWrapper color="bg-green-500">{data.label}</NodeWrapper>;
}

export function RotationNode({ data }: any) {
  return <NodeWrapper color="bg-cyan-500">{data.label}</NodeWrapper>;
}

export function ScaleNode({ data }: any) {
  return <NodeWrapper color="bg-violet-500">{data.label}</NodeWrapper>;
}

export function ConditionNode({ data }: any) {
  return <NodeWrapper color="bg-amber-500">{data.label}</NodeWrapper>;
}

export function LoopNode({ data }: any) {
  return <NodeWrapper color="bg-purple-500">{data.label}</NodeWrapper>;
}

export function VariableNode({ data }: any) {
  return <NodeWrapper color="bg-pink-500">{data.label}</NodeWrapper>;
}

export function FunctionCallNode({ data }: any) {
  return <NodeWrapper color="bg-indigo-500">{data.label}</NodeWrapper>;
}

export function SignalNode({ data }: any) {
  return <NodeWrapper color="bg-red-500">{data.label}</NodeWrapper>;
}

export function AnimationNode({ data }: any) {
  return <NodeWrapper color="bg-cyan-500">{data.label}</NodeWrapper>;
}

export function AudioNode({ data }: any) {
  return <NodeWrapper color="bg-orange-500">{data.label}</NodeWrapper>;
}

export function TimerNode({ data }: any) {
  return <NodeWrapper color="bg-yellow-500">{data.label}</NodeWrapper>;
}

export function PhysicsNode({ data }: any) {
  return <NodeWrapper color="bg-teal-500">{data.label}</NodeWrapper>;
}

export function SpawnNode({ data }: any) {
  return <NodeWrapper color="bg-lime-500">{data.label}</NodeWrapper>;
}

export function DestroyNode({ data }: any) {
  return <NodeWrapper color="bg-rose-500">{data.label}</NodeWrapper>;
}

export function CameraNode({ data }: any) {
  return <NodeWrapper color="bg-violet-500">{data.label}</NodeWrapper>;
}

export function TweenNode({ data }: any) {
  return <NodeWrapper color="bg-fuchsia-500">{data.label}</NodeWrapper>;
}

export function GroupNode({ data }: any) {
  return <NodeWrapper color="bg-sky-500">{data.label}</NodeWrapper>;
}

export function PropertyNode({ data }: any) {
  return <NodeWrapper color="bg-slate-500">{data.label}</NodeWrapper>;
}

export function InputCheckNode({ data }: any) {
  return <NodeWrapper color="bg-stone-500">{data.label}</NodeWrapper>;
}

export function SceneNode({ data }: any) {
  return <NodeWrapper color="bg-emerald-500">{data.label}</NodeWrapper>;
}

export function CollisionNode({ data }: any) {
  return <NodeWrapper color="bg-blue-600">{data.label}</NodeWrapper>;
}

export function DataNode({ data }: any) {
  return <NodeWrapper color="bg-gray-500">{data.label}</NodeWrapper>;
}

export function CodeNode({ data }: any) {
  return <NodeWrapper color="bg-zinc-600">{data.label}</NodeWrapper>;
}

export function PrintNode({ data }: any) {
  return <NodeWrapper color="bg-emerald-600">{data.label}</NodeWrapper>;
}

export function CommentNode({ data }: any) {
  return <NodeWrapper color="bg-gray-600">{data.label}</NodeWrapper>;
}
