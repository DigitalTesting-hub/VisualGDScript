import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeOutput } from "@/components/code-output";
import { CodeEnhancement } from "@/components/code-enhancement";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Download, Eye, EyeOff, Save, X, Copy, Clipboard } from "lucide-react";
import { FlowchartNodeConfig } from "./flowchart-node-config";
import {
  StartNode,
  EventNode,
  MovementNode,
  RotationNode,
  ScaleNode,
  ConditionNode,
  LoopNode,
  VariableNode,
  FunctionCallNode,
  SignalNode,
  AnimationNode,
  AudioNode,
  TimerNode,
  PhysicsNode,
  SpawnNode,
  DestroyNode,
  CameraNode,
  TweenNode,
  GroupNode,
  PropertyNode,
  InputCheckNode,
  SceneNode,
  CollisionNode,
  DataNode,
  CodeNode,
  PrintNode,
  CommentNode,
} from "../flowchart-node-types";

const nodeComponentTypes = {
  start: StartNode,
  event: EventNode,
  movement: MovementNode,
  rotation: RotationNode,
  scale: ScaleNode,
  condition: ConditionNode,
  loop: LoopNode,
  variable: VariableNode,
  function_call: FunctionCallNode,
  signal: SignalNode,
  animation: AnimationNode,
  audio: AudioNode,
  timer: TimerNode,
  physics: PhysicsNode,
  spawn: SpawnNode,
  destroy: DestroyNode,
  camera: CameraNode,
  tween: TweenNode,
  group: GroupNode,
  property: PropertyNode,
  input_check: InputCheckNode,
  scene: SceneNode,
  collision: CollisionNode,
  data: DataNode,
  code: CodeNode,
  print: PrintNode,
  comment: CommentNode,
};

const nodeTypes = {
  event: { label: "Event", color: "#3b82f6", icon: "▶" },
  movement: { label: "Movement", color: "#10b981", icon: "→" },
  rotation: { label: "Rotation", color: "#06b6d4", icon: "↻" },
  scale: { label: "Scale", color: "#8b5cf6", icon: "◆" },
  animation: { label: "Animation", color: "#06b6d4", icon: "▶▶" },
  audio: { label: "Audio", color: "#f97316", icon: "🔊" },
  timer: { label: "Timer", color: "#eab308", icon: "⏱" },
  destroy: { label: "Destroy", color: "#f43f5e", icon: "✕" },
  code: { label: "Code", color: "#3f3f3f", icon: "</>" },
  print: { label: "Print", color: "#059669", icon: "🖨" },
  comment: { label: "Comment", color: "#6b7280", icon: "#" },
  condition: { label: "Condition", color: "#f59e0b", icon: "◇" },
  loop: { label: "Loop", color: "#8b5cf6", icon: "↻" },
  variable: { label: "Variable", color: "#ec4899", icon: "x" },
  function_call: { label: "Function", color: "#6366f1", icon: "ƒ" },
  signal: { label: "Signal", color: "#ef4444", icon: "◆" },
  physics: { label: "Physics", color: "#14b8a6", icon: "⚡" },
  spawn: { label: "Spawn", color: "#84cc16", icon: "✚" },
  camera: { label: "Camera", color: "#a855f7", icon: "📷" },
  tween: { label: "Tween", color: "#d946ef", icon: "~" },
  group: { label: "Group", color: "#0ea5e9", icon: "⊙" },
  property: { label: "Property", color: "#64748b", icon: "⚙" },
  input_check: { label: "Input Check", color: "#78350f", icon: "?" },
  scene: { label: "Scene", color: "#10b981", icon: "⊞" },
  collision: { label: "Collision", color: "#1e40af", icon: "◈" },
  data: { label: "Data", color: "#6b7280", icon: "📊" },
};

const GRID_START_X = 250;
const GRID_START_Y = 100;
const GRID_CELL_HEIGHT = 150;
const NODE_OFFSET_X = 180;
const NODE_OFFSET_Y = 80;

const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    data: { 
      label: "Start",
    },
    position: { x: 250, y: 5 },
    style: { background: "#00AA00", color: "#0000FF", padding: "10px", fontWeight: "bold" },
  },
];

const initialEdges: Edge[] = [];

function FlowchartPanelContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [generatedCode, setGeneratedCode] = useState("");
  const [nodeCounter, setNodeCounter] = useState(2);
  const [showCodePreview, setShowCodePreview] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(new Set());
  const [clipboard, setClipboard] = useState<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const { toast } = useToast();
  const { fitView, setCenter } = useReactFlow();

  const isValidConnection = useCallback(
    (connection: Connection) => {
      if (connection.source === connection.target) return false;
      
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);
      
      if (!sourceNode || !targetNode) return false;
      
      const sourceType = sourceNode.type;
      const targetType = targetNode.type;
      const sourceHandle = connection.sourceHandle || "";
      const targetHandle = connection.targetHandle || "";
      
      // Prevent duplicate connections between same nodes
      if (edges.some((e) => e.source === connection.source && e.target === connection.target)) {
        return false;
      }
      
      // Start node (id "1", type "start") can connect to any node via bottom→top
      if (connection.source === "1" && sourceType === "start") {
        if (sourceHandle !== "bottom" || targetHandle !== "top") return false;
        // Allow connection to any node type
        return true;
      }
      
      // Event nodes CAN connect horizontally (right→left-target) to create OR conditions
      // But NOT vertically (bottom→top) to prevent stacked conditions
      if (sourceType === "event" && targetType === "event") {
        if (sourceHandle === "right" && targetHandle === "left-target") {
          return true; // Allow horizontal Event-to-Event (will be OR'd)
        }
        return false; // Block vertical Event-to-Event
      }
      
      // Horizontal (side) connections: right→left-target, only same types
      if (sourceHandle === "right" && targetHandle === "left-target") {
        if (sourceType !== targetType) return false;
        // Target can only receive from one left connection
        return !edges.some((e) => e.target === connection.target && e.targetHandle === "left-target");
      }
      
      // Vertical (main) connections: bottom→top, only different types
      if (sourceHandle === "bottom" && targetHandle === "top") {
        if (sourceType === targetType) return false;
        // Action cannot connect to Event
        if (sourceType === "action" && targetType === "event") return false;
        // Target can only receive from one top connection
        return !edges.some((e) => e.target === connection.target && e.targetHandle === "top");
      }
      
      return false;
    },
    [nodes, edges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("Connection attempt:", {
        source: connection.source,
        sourceHandle: connection.sourceHandle,
        target: connection.target,
        targetHandle: connection.targetHandle,
      });
      if (isValidConnection(connection)) {
        setEdges((eds) => addEdge(connection, eds));
      } else {
        // Show feedback when connection is invalid
        if (connection.source === connection.target) {
          toast({ title: "Invalid", description: "Cannot connect node to itself", variant: "destructive" });
        } else if (edges.some((e) => (e.source === connection.source && e.target === connection.target) || (e.source === connection.target && e.target === connection.source))) {
          toast({ title: "Duplicate", description: "Connection already exists", variant: "destructive" });
        }
      }
    },
    [setEdges, isValidConnection, edges, toast]
  );

  // Handle Ctrl+click to delete edges
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: any) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        toast({ title: "Disconnected", description: "Edge removed" });
      }
    },
    [setEdges, toast]
  );

  const addNode = (type: keyof typeof nodeTypes) => {
    const nodeData = nodeTypes[type];
    let posX = GRID_START_X;
    let posY = GRID_START_Y + (nodeCounter - 2) * GRID_CELL_HEIGHT;
    
    // Add nearby existing nodes with offset
    if (nodes.length > 1) {
      const lastNode = nodes[nodes.length - 1];
      posX = lastNode.position.x + NODE_OFFSET_X;
      posY = lastNode.position.y + NODE_OFFSET_Y;
    }

    const nodeData_obj: Record<string, any> = { label: nodeData.label };
    
    // Set default data for each node type
    switch (type) {
      case "event":
        nodeData_obj.inputType = "action";
        nodeData_obj.actionName = "ui_accept";
        nodeData_obj.keyPress = "Space";
        nodeData_obj.holdDuration = 1;
        break;
      case "movement":
        nodeData_obj.movementNodeType = "Node2D";
        nodeData_obj.directionX = 0;
        nodeData_obj.directionY = 0;
        nodeData_obj.directionZ = 0;
        nodeData_obj.speed = 1;
        break;
      case "rotation":
        nodeData_obj.rotationNodeType = "Node2D";
        nodeData_obj.rotationX = 0;
        nodeData_obj.rotationY = 0;
        nodeData_obj.rotationZ = 0;
        break;
      case "animation":
        nodeData_obj.animationNodeType = "AnimationPlayer";
        nodeData_obj.animationName = "idle";
        nodeData_obj.animationAction = "play";
        nodeData_obj.animationSpeed = 1;
        nodeData_obj.animationDirection = "forward";
        break;
      case "audio":
        nodeData_obj.audioNodeType = "AudioStreamPlayer";
        nodeData_obj.audioFile = "res://sounds/effect.ogg";
        nodeData_obj.audioVolume = 1;
        nodeData_obj.audioLoop = false;
        break;
      case "timer":
        nodeData_obj.timerDuration = 1;
        nodeData_obj.timerAutostart = false;
        break;
      case "physics":
        nodeData_obj.physicsBodyType = "RigidBody2D";
        nodeData_obj.physicsGameMode = "2d";
        nodeData_obj.physicsType = "velocity";
        nodeData_obj.physicsX = 0;
        nodeData_obj.physicsY = 0;
        nodeData_obj.physicsZ = 0;
        break;
      case "spawn":
        nodeData_obj.spawnNodeType = "Node2D";
        nodeData_obj.spawnGameMode = "2d";
        nodeData_obj.spawnScene = "res://scenes/enemy.tscn";
        nodeData_obj.spawnX = 0;
        nodeData_obj.spawnY = 0;
        nodeData_obj.spawnZ = 0;
        break;
      case "destroy":
        nodeData_obj.destroyDelay = 0;
        break;
      case "camera":
        nodeData_obj.cameraGameMode = "2d";
        nodeData_obj.cameraAction = "enable";
        break;
      case "tween":
        nodeData_obj.tweenGameMode = "2d";
        nodeData_obj.tweenDuration = 1;
        nodeData_obj.tweenEasing = "Linear";
        nodeData_obj.tweenProperty = "position";
        break;
      case "group":
        nodeData_obj.groupName = "group";
        nodeData_obj.groupAction = "add";
        break;
      case "property":
        nodeData_obj.propertyGameMode = "2d";
        nodeData_obj.propertyNodePath = ".";
        nodeData_obj.propertyName = "property";
        nodeData_obj.propertyValue = "0";
        break;
      case "input_check":
        nodeData_obj.inputCheckType = "action";
        nodeData_obj.actionName = "ui_accept";
        break;
      case "scene":
        nodeData_obj.scenePath = "res://scenes/level1.tscn";
        nodeData_obj.sceneAction = "change";
        break;
      case "collision":
        nodeData_obj.collisionDetect = "area";
        break;
      case "variable":
        nodeData_obj.varName = "my_var";
        nodeData_obj.varValue = "0";
        break;
      case "function_call":
        nodeData_obj.funcType = "custom";
        nodeData_obj.functionName = "my_function";
        nodeData_obj.parameters = "";
        nodeData_obj.builtinFunc = "_ready";
        break;
      case "signal":
        nodeData_obj.signalSource = "self";
        nodeData_obj.signalName = "signal_fired";
        nodeData_obj.signalParams = "";
        break;
      case "condition":
        nodeData_obj.conditionText = "true";
        break;
      case "loop":
        nodeData_obj.loopCount = 10;
        break;
      case "data":
        nodeData_obj.dataKey = "key";
        nodeData_obj.dataValue = "value";
        break;
      case "code":
        nodeData_obj.customCode = "pass";
        break;
    }

    const newNode: Node = {
      id: nodeCounter.toString(),
      type,
      data: nodeData_obj,
      position: { x: posX, y: posY },
      style: {
        background: nodeData.color,
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        border: "2px solid transparent",
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCounter(nodeCounter + 1);
  };

  // Period key shortcut to center on start node
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ".") {
        e.preventDefault();
        // Center on start node (id: "1")
        setCenter(GRID_START_X, 5, { zoom: 1, duration: 500 });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setCenter]);

  const deleteNode = () => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
      setEdges((eds) =>
        eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId)
      );
      setSelectedNodeId(null);
      toast({ title: "Node Deleted", description: "Node and connected edges removed" });
    }
  };

  const clearAll = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setGeneratedCode("");
    setSelectedNodeId(null);
    setNodeCounter(2);
    setShowCodePreview(false);
    toast({ title: "Cleared", description: "Flowchart reset to default" });
  };

  const updateNodeData = (nodeId: string, key: string, value: any) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, [key]: value } } : n
      )
    );
  };

  const generateMutation = useMutation({
    mutationFn: async () => {
      const currentNodes = nodes;
      const currentEdges = edges;
      
      const payload = {
        nodes: currentNodes.map((n) => ({
          id: n.id,
          type: n.type || "action",
          label: n.data?.label || "Node",
          data: n.data || {},
          position: n.position,
        })),
        edges: currentEdges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle: e.sourceHandle,
          targetHandle: e.targetHandle,
        })),
      };
      
      console.log("[Generate] Start node data:", currentNodes[0]?.data);
      console.log("[Generate] Payload:", JSON.stringify(payload, null, 2));
      const response = await apiRequest("POST", "/api/flowchart/generate", payload);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Code generation failed");
      }
      return data as { code: string; validation?: any; codeIssues?: any };
    },
    onSuccess: (data) => {
      setGeneratedCode(data.code);
      setShowCodePreview(true);
      queryClient.invalidateQueries();
      toast({ title: "Code Generated!", description: "Your flowchart is ready" });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const saveTemplateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/flowchart/templates", {
        name: templateName,
        description: templateDesc,
        nodes: nodes.map((n) => ({
          id: n.id,
          type: n.type || "action",
          label: n.data?.label || "Node",
          data: n.data || {},
          position: n.position,
        })),
        edges: edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
        })),
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({ title: "Template Saved!", description: templateName });
      setShowSaveDialog(false);
      setTemplateName("");
      setTemplateDesc("");
    },
    onError: (error: Error) => {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const downloadCode = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(generatedCode)
    );
    element.setAttribute("download", "flowchart_script.gd");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : null;

  // Handle drag and drop from side panel
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    if (nodeType && nodeType in nodeTypes) {
      addNode(nodeType as keyof typeof nodeTypes);
    }
  };

  const copyNodes = (nodeIds: string[]) => {
    if (nodeIds.length === 0) return;
    const nodesToCopy = nodes.filter(n => nodeIds.includes(n.id));
    const edgesToCopy = edges.filter(e => nodeIds.includes(e.source) && nodeIds.includes(e.target));
    setClipboard({ nodes: nodesToCopy, edges: edgesToCopy });
    toast({ title: "Copied", description: `${nodeIds.length} node(s) copied to clipboard` });
  };

  const pasteNodes = () => {
    if (!clipboard || clipboard.nodes.length === 0) {
      toast({ title: "Empty Clipboard", description: "No nodes to paste", variant: "destructive" });
      return;
    }

    const idMap: Record<string, string> = {};
    let newCounter = nodeCounter;
    
    // Clone nodes with new IDs and offset position
    const pastedNodes = clipboard.nodes.map(node => {
      const newId = String(newCounter++);
      idMap[node.id] = newId;
      return {
        ...node,
        id: newId,
        position: { x: node.position.x + 200, y: node.position.y + 100 },
      };
    });

    // Clone edges with new IDs
    const pastedEdges = clipboard.edges.map(edge => ({
      ...edge,
      id: `e${Math.random()}`,
      source: idMap[edge.source],
      target: idMap[edge.target],
    }));

    setNodes((nds) => [...nds, ...pastedNodes]);
    setEdges((eds) => [...eds, ...pastedEdges]);
    setNodeCounter(newCounter);
    toast({ title: "Pasted", description: `${pastedNodes.length} node(s) pasted` });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      if (selectedNodeIds.size > 0) {
        copyNodes(Array.from(selectedNodeIds));
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.preventDefault();
      pasteNodes();
    }
  }, [selectedNodeIds]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="w-full h-full flex flex-col bg-background"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-3 p-3">
          {/* Node Configuration (if selected) */}
          {selectedNode && (
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-sm">Node Configuration: {selectedNode.data?.label}</CardTitle>
                <div className="flex gap-1">
                  {selectedNode.type !== "start" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      title="Copy this node (Ctrl+C)"
                      onClick={() => {
                        copyNodes([selectedNodeId!]);
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setSelectedNodeId(null);
                      setSelectedNodeIds(new Set());
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <FlowchartNodeConfig
                    nodeType={selectedNode.type || "action"}
                    nodeData={selectedNode.data || {}}
                    onDataChange={(key, value) =>
                      updateNodeData(selectedNodeId!, key, value)
                    }
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Section 3: Canvas - 3x Larger Height */}
          <Card style={{ height: "600px", overflow: "auto" }}>
            <div className="w-full h-full overflow-auto">
              <ReactFlow
                nodes={nodes.map((n) => ({
                  ...n,
                  selected: selectedNodeIds.has(n.id),
                  style: {
                    ...n.style,
                    border: selectedNodeIds.has(n.id) || selectedNodeId === n.id ? "2px solid #0ea5e9" : "2px solid transparent",
                  },
                }))}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                isValidConnection={isValidConnection}
                onNodeClick={(_, node) => {
                  setSelectedNodeId(node.id);
                  setSelectedNodeIds(new Set([node.id]));
                }}
                onPaneClick={() => {
                  setSelectedNodeId(null);
                  setSelectedNodeIds(new Set());
                }}
                onEdgeClick={onEdgeClick}
                nodeTypes={nodeComponentTypes}
                fitView
                selectionOnDrag={true}
                multiSelectionKeyCode={null}
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>
          </Card>

          {/* Section 4: Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="h-8"
                  onClick={() => generateMutation.mutate()}
                  disabled={generateMutation.isPending}
                  data-testid="button-generate-code"
                >
                  {generateMutation.isPending ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <Plus className="h-3 w-3 mr-1" />
                  )}
                  Generate
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => setShowCodePreview(!showCodePreview)}
                  data-testid="button-toggle-preview"
                >
                  {showCodePreview ? (
                    <EyeOff className="h-3 w-3 mr-1" />
                  ) : (
                    <Eye className="h-3 w-3 mr-1" />
                  )}
                  {showCodePreview ? "Hide" : "Show"}
                </Button>

                {generatedCode && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={downloadCode}
                    data-testid="button-download-code"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                )}

                {clipboard && clipboard.nodes.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={pasteNodes}
                    title="Paste nodes (Ctrl+V)"
                    data-testid="button-paste-nodes"
                  >
                    <Clipboard className="h-3 w-3 mr-1" />
                    Paste
                  </Button>
                )}

                <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      data-testid="button-save-template"
                    >
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Flowchart as Template</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input
                          id="template-name"
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="e.g., Enemy AI Logic"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="template-desc">Description</Label>
                        <Textarea
                          id="template-desc"
                          value={templateDesc}
                          onChange={(e) => setTemplateDesc(e.target.value)}
                          placeholder="What does this flowchart do?"
                        />
                      </div>
                      <Button
                        onClick={() => saveTemplateMutation.mutate()}
                        disabled={!templateName || saveTemplateMutation.isPending}
                      >
                        {saveTemplateMutation.isPending && (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        )}
                        Save
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {selectedNodeId && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8"
                    onClick={deleteNode}
                    data-testid="button-delete-node"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                )}

                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8"
                  onClick={clearAll}
                  data-testid="button-clear-all"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Code Output (if preview enabled) */}
          {showCodePreview && generatedCode && (
            <div className="space-y-3">
              <Card style={{ height: "400px" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Generated GDScript</CardTitle>
                </CardHeader>
                <CardContent className="h-full overflow-hidden">
                  <CodeOutput code={generatedCode} />
                </CardContent>
              </Card>
              <CodeEnhancement code={generatedCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FlowchartPanel() {
  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "100%" }}>
        <FlowchartPanelContent />
      </div>
    </ReactFlowProvider>
  );
}
