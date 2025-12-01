import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const KEYBOARD_KEYS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "Space", "Enter", "Tab", "Escape", "Backspace", "Delete",
  "Up", "Down", "Left", "Right", "Home", "End", "Page Up", "Page Down",
  "Shift", "Control", "Alt", "Meta",
  "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  "Plus", "Minus", "Equal", "Slash", "Backslash", "Comma", "Period",
  "Semicolon", "Apostrophe", "Bracket Left", "Bracket Right", "Grave",
];

const EASING_TYPES = [
  "Linear", "InQuad", "OutQuad", "InOutQuad",
  "InCubic", "OutCubic", "InOutCubic",
  "InQuart", "OutQuart", "InOutQuart",
  "InQuint", "OutQuint", "InOutQuint",
  "InSine", "OutSine", "InOutSine",
  "InExpo", "OutExpo", "InOutExpo",
  "InCirc", "OutCirc", "InOutCirc",
];

const ANIMATION_NODE_TYPES = ["AnimationPlayer", "AnimatedSprite2D", "Sprite2D", "AnimationTree", "Tween"];
const AUDIO_NODE_TYPES = ["AudioStreamPlayer", "AudioStreamPlayer2D", "AudioStreamPlayer3D", "AudioStreamPlayback"];
const FUNCTION_TYPES = ["Built-in", "Custom"];
const SIGNAL_SOURCES = ["self", "get_parent()", "get_tree()", "get_parent().get_parent()"];
const PHYSICS_BODIES = ["RigidBody2D", "CharacterBody2D", "RigidBody3D", "CharacterBody3D", "StaticBody2D", "StaticBody3D", "Area2D", "Area3D"];
const SPAWN_NODE_TYPES = ["Node2D", "Node3D", "Area2D", "Area3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D"];
const GODOT_NODE_LIST = ["Node", "Node2D", "Node3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D", "StaticBody2D", "StaticBody3D", "Area2D", "Area3D", "AnimationPlayer", "Sprite2D", "Sprite3D", "AnimatedSprite2D", "Camera2D", "Camera3D", "AudioStreamPlayer", "AudioStreamPlayer2D", "AudioStreamPlayer3D", "Control", "Button", "Label", "LineEdit", "TextEdit", "Panel", "VBoxContainer", "HBoxContainer", "GridContainer", "TabContainer", "OptionButton", "CheckBox", "SpinBox", "Slider", "ProgressBar", "ColorPickerButton", "FileDialog", "Window", "ConfirmationDialog", "AcceptDialog", "Popup", "MarginContainer", "CenterContainer", "AspectRatioContainer", "TabBar", "HSplitContainer", "VSplitContainer", "ItemList", "Tree", "TableBox", "Timer", "Path2D", "Path3D", "PathFollow2D", "PathFollow3D", "TileMap", "TileSet", "CollisionShape2D", "CollisionShape3D", "PhysicsBody2D", "PhysicsBody3D", "CharacterBody2D", "CharacterBody3D", "RigidBody2D", "RigidBody3D", "StaticBody2D", "StaticBody3D", "Area2D", "Area3D", "MeshInstance3D", "Light3D", "DirectionalLight3D", "OmniLight3D", "SpotLight3D", "Marker2D", "Marker3D", "NavigationRegion2D", "NavigationRegion3D", "NavigationAgent2D", "NavigationAgent3D", "NavigationObstacle2D", "NavigationObstacle3D", "MultiplayerSpawner", "RemoteSynchronizer", "AnimationTree", "Tween", "Skeleton2D", "Skeleton3D", "BoneAttachment3D", "IKSkeleton3D", "EditorScenePostImport", "SubViewport", "Viewport", "CanvasLayer", "CanvasGroup", "MultiMesh", "Decal", "CSGBox3D", "CSGSphere3D", "CSGTorus3D", "CSGCylinder3D", "CSGCombiner3D", "CPUParticles2D", "CPUParticles3D", "GPUParticles2D", "GPUParticles3D", "Occluder3D", "VoxelGI", "LightmapGI", "ReflectionProbe", "ShapeCast2D", "ShapeCast3D", "RayCast2D", "RayCast3D", "AudioStreamPlayback", "Material", "StandardMaterial3D", "OrmMaterial3D", "ORMMaterial3D", "PBRMaterial", "CanvasMaterial", "ParticleProcessMaterial", "PlaneShape3D", "BoxShape3D", "SphereShape3D", "CylinderShape3D", "CapsuleShape3D", "CircleShape2D", "RectangleShape2D", "CapsuleShape2D", "SegmentShape2D", "SeparationRayShape2D", "ConvexPolygonShape3D", "ConvexPolygonShape2D", "ConcavePolygonShape3D", "ConcavePolygonShape2D"];

interface NodeConfigProps {
  nodeType: string;
  nodeData: Record<string, any>;
  onDataChange: (key: string, value: any) => void;
}

export function FlowchartNodeConfig({ nodeType, nodeData, onDataChange }: NodeConfigProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Node Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Label for all nodes */}
        <div className="space-y-2">
          <Label className="text-xs">Label</Label>
          <Input
            value={nodeData.label || ""}
            onChange={(e) => onDataChange("label", e.target.value)}
            placeholder="Node label"
            className="h-8 text-xs"
          />
        </div>

        {nodeType === "start" && (
          <>
            <div className="space-y-2">
              <Label>Extends Node Type</Label>
              <Select value={nodeData.startNodeType || ""} onValueChange={(v) => onDataChange("startNodeType", v)}>
                <SelectTrigger className="h-8">
                  {nodeData.startNodeType ? nodeData.startNodeType : <SelectValue placeholder="Select node type..." />}
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {GODOT_NODE_LIST.map((node) => (
                    <SelectItem key={node} value={node}>{node}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {nodeType === "event" && (
          <>
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={nodeData.eventType || ""} onValueChange={(v) => { onDataChange("eventType", v); onDataChange("eventParam", ""); }}>
                <SelectTrigger className="h-8">
                  {nodeData.eventType ? nodeData.eventType.replace(/_/g, " ").toUpperCase() : <SelectValue placeholder="Select event..." />}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input_action_pressed">Input Action Pressed</SelectItem>
                  <SelectItem value="input_action_released">Input Action Released</SelectItem>
                  <SelectItem value="keyboard_key_pressed">Keyboard Key Pressed</SelectItem>
                  <SelectItem value="keyboard_key_released">Keyboard Key Released</SelectItem>
                  <SelectItem value="mouse_button_pressed">Mouse Button Pressed</SelectItem>
                  <SelectItem value="mouse_button_released">Mouse Button Released</SelectItem>
                  <SelectItem value="mouse_motion">Mouse Motion</SelectItem>
                  <SelectItem value="mouse_scroll">Mouse Scroll</SelectItem>
                  <SelectItem value="touch_pressed">Touch Pressed</SelectItem>
                  <SelectItem value="touch_released">Touch Released</SelectItem>
                  <SelectItem value="touch_motion">Touch Motion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {nodeData.eventType?.includes("action") && (
              <div className="space-y-2">
                <Label className="text-xs">Action Name</Label>
                <Input
                  value={nodeData.eventParam || ""}
                  onChange={(e) => onDataChange("eventParam", e.target.value)}
                  className="h-8 text-xs bg-slate-800"
                  placeholder="ui_right"
                />
              </div>
            )}

            {nodeData.eventType?.includes("keyboard") && (
              <div className="space-y-2">
                <Label className="text-xs">Keyboard Key</Label>
                <Select value={nodeData.eventParam || ""} onValueChange={(v) => onDataChange("eventParam", v)}>
                  <SelectTrigger className="h-8 bg-slate-800">
                    <SelectValue placeholder="Select key..." />
                  </SelectTrigger>
                  <SelectContent>
                    {KEYBOARD_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {nodeData.eventType?.includes("mouse_button") && (
              <div className="space-y-2">
                <Label className="text-xs">Mouse Button</Label>
                <Select value={nodeData.eventParam || ""} onValueChange={(v) => onDataChange("eventParam", v)}>
                  <SelectTrigger className="h-8 bg-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Left Click</SelectItem>
                    <SelectItem value="2">Right Click</SelectItem>
                    <SelectItem value="3">Middle Click</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

          </>
        )}

        {nodeType === "movement" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Movement Node Type</Label>
              <Select value={nodeData.movementNodeType || "Node2D"} onValueChange={(v) => { onDataChange("movementNodeType", v); onDataChange("actionType", "move_position"); }}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Node2D">Node2D</SelectItem>
                  <SelectItem value="Node3D">Node3D</SelectItem>
                  <SelectItem value="CharacterBody2D">CharacterBody2D</SelectItem>
                  <SelectItem value="CharacterBody3D">CharacterBody3D</SelectItem>
                  <SelectItem value="RigidBody2D">RigidBody2D</SelectItem>
                  <SelectItem value="RigidBody3D">RigidBody3D</SelectItem>
                  <SelectItem value="Area2D">Area2D</SelectItem>
                  <SelectItem value="Area3D">Area3D</SelectItem>
                  <SelectItem value="PathFollow2D">PathFollow2D</SelectItem>
                  <SelectItem value="PathFollow3D">PathFollow3D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Direction</Label>
              <Select value={nodeData.direction || "X"} onValueChange={(v) => { onDataChange("direction", v); onDataChange("actionType", "move_position"); }}>
                <SelectTrigger className="h-8">
                  {nodeData.direction ? nodeData.direction : <SelectValue placeholder="Select direction..." />}
                </SelectTrigger>
                <SelectContent>
                  {(nodeData.movementNodeType?.includes("3D") || nodeData.movementNodeType?.includes("Body3D") || nodeData.movementNodeType?.includes("Area3D")) ? (
                    <>
                      <SelectItem value="X">X</SelectItem>
                      <SelectItem value="Y">Y</SelectItem>
                      <SelectItem value="Z">Z</SelectItem>
                      <SelectItem value="-X">-X</SelectItem>
                      <SelectItem value="-Y">-Y</SelectItem>
                      <SelectItem value="-Z">-Z</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="X">X</SelectItem>
                      <SelectItem value="Y">Y</SelectItem>
                      <SelectItem value="-X">-X</SelectItem>
                      <SelectItem value="-Y">-Y</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Speed</Label>
              <Input
                type="number"
                value={nodeData.speed || 1}
                onChange={(e) => { onDataChange("speed", e.target.value); onDataChange("actionType", "move_position"); }}
                placeholder="1"
                className="h-8 text-xs"
                step="0.1"
                min="0"
              />
            </div>
          </>
        )}

        {nodeType === "scale" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Scale Node Type</Label>
              <Select value={nodeData.scaleNodeType || "Node2D"} onValueChange={(v) => onDataChange("scaleNodeType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Node2D">Node2D</SelectItem>
                  <SelectItem value="Node3D">Node3D</SelectItem>
                  <SelectItem value="CharacterBody2D">CharacterBody2D</SelectItem>
                  <SelectItem value="CharacterBody3D">CharacterBody3D</SelectItem>
                  <SelectItem value="RigidBody2D">RigidBody2D</SelectItem>
                  <SelectItem value="RigidBody3D">RigidBody3D</SelectItem>
                  <SelectItem value="Area2D">Area2D</SelectItem>
                  <SelectItem value="Area3D">Area3D</SelectItem>
                  <SelectItem value="Sprite2D">Sprite2D</SelectItem>
                  <SelectItem value="Sprite3D">Sprite3D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Scale Mode</Label>
              <Select value={nodeData.scaleMode || "linked"} onValueChange={(v) => onDataChange("scaleMode", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linked">Linked (X=Y=Z)</SelectItem>
                  <SelectItem value="individual">Individual (X, Y, Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {nodeData.scaleMode === "linked" ? (
              <div className="space-y-2">
                <Label className="text-xs">Scale</Label>
                <Input
                  type="number"
                  value={nodeData.scaleUniform || 1}
                  onChange={(e) => onDataChange("scaleUniform", e.target.value)}
                  placeholder="1"
                  className="h-8 text-xs"
                  step="0.1"
                  min="0"
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Scale X</Label>
                  <Input
                    type="number"
                    value={nodeData.scaleX || 1}
                    onChange={(e) => onDataChange("scaleX", e.target.value)}
                    placeholder="1"
                    className="h-8 text-xs"
                    step="0.1"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Scale Y</Label>
                  <Input
                    type="number"
                    value={nodeData.scaleY || 1}
                    onChange={(e) => onDataChange("scaleY", e.target.value)}
                    placeholder="1"
                    className="h-8 text-xs"
                    step="0.1"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Scale Z</Label>
                  <Input
                    type="number"
                    value={nodeData.scaleZ || 1}
                    onChange={(e) => onDataChange("scaleZ", e.target.value)}
                    placeholder="1"
                    className="h-8 text-xs"
                    step="0.1"
                    min="0"
                  />
                </div>
              </>
            )}
          </>
        )}

        {nodeType === "condition" && (
          <div className="space-y-2">
            <Label className="text-xs">Condition</Label>
            <Input
              value={nodeData.condition || ""}
              onChange={(e) => onDataChange("condition", e.target.value)}
              placeholder="x > 10"
              className="h-8 text-xs"
            />
          </div>
        )}

        {nodeType === "loop" && (
          <div className="space-y-2">
            <Label className="text-xs">Loop Count</Label>
            <Input
              type="number"
              value={nodeData.loopCount || 10}
              onChange={(e) => onDataChange("loopCount", e.target.value)}
              className="h-8 text-xs"
              min="1"
            />
          </div>
        )}

        {nodeType === "variable" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Variable Name</Label>
              <Input
                value={nodeData.varName || ""}
                onChange={(e) => onDataChange("varName", e.target.value)}
                placeholder="my_var"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Variable Value</Label>
              <Input
                value={nodeData.varValue || "0"}
                onChange={(e) => onDataChange("varValue", e.target.value)}
                placeholder="0"
                className="h-8 text-xs"
              />
            </div>
          </>
        )}

        {nodeType === "function_call" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Function Type</Label>
              <Select value={nodeData.funcType || "custom"} onValueChange={(v) => onDataChange("funcType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="builtin">Built-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {nodeData.funcType === "builtin" ? (
              <div className="space-y-2">
                <Label className="text-xs">Built-in Function</Label>
                <Select value={nodeData.builtinFunc || "_ready"} onValueChange={(v) => onDataChange("builtinFunc", v)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_ready">_ready</SelectItem>
                    <SelectItem value="_process">_process</SelectItem>
                    <SelectItem value="_physics_process">_physics_process</SelectItem>
                    <SelectItem value="_input">_input</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Function Name</Label>
                  <Input
                    value={nodeData.functionName || ""}
                    onChange={(e) => onDataChange("functionName", e.target.value)}
                    placeholder="my_function"
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Parameters</Label>
                  <Input
                    value={nodeData.parameters || ""}
                    onChange={(e) => onDataChange("parameters", e.target.value)}
                    placeholder="param1, param2"
                    className="h-8 text-xs"
                  />
                </div>
              </>
            )}
          </>
        )}

        {nodeType === "signal" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Signal Source</Label>
              <Select value={nodeData.signalSource || "self"} onValueChange={(v) => onDataChange("signalSource", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SIGNAL_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Signal Name</Label>
              <Input
                value={nodeData.signalName || ""}
                onChange={(e) => onDataChange("signalName", e.target.value)}
                placeholder="my_signal"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Parameters</Label>
              <Input
                value={nodeData.signalParams || ""}
                onChange={(e) => onDataChange("signalParams", e.target.value)}
                placeholder="param1, param2"
                className="h-8 text-xs"
              />
            </div>
          </>
        )}

        {nodeType === "rotation" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Rotation Type</Label>
              <Select value={nodeData.rotationType || "rotate_continuous"} onValueChange={(v) => onDataChange("rotationType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rotate_continuous">Continuous Rotation</SelectItem>
                  <SelectItem value="rotate_to_target">Rotate to Target</SelectItem>
                  <SelectItem value="rotate_on_input">Rotate on Input</SelectItem>
                  <SelectItem value="rotate_between_angles">Between Angles</SelectItem>
                  <SelectItem value="rotate_snap">Snap to Angle</SelectItem>
                  <SelectItem value="rotate_shake">Shake Effect</SelectItem>
                  <SelectItem value="rotate_physics">Physics-based</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Rotation Axis</Label>
              <Select value={nodeData.rotationAxis || "y"} onValueChange={(v) => onDataChange("rotationAxis", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">X</SelectItem>
                  <SelectItem value="y">Y</SelectItem>
                  <SelectItem value="z">Z</SelectItem>
                  <SelectItem value="all">All Axes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Speed/Sensitivity</Label>
              <Input
                type="number"
                value={nodeData.rotationSpeed || 1.0}
                onChange={(e) => onDataChange("rotationSpeed", e.target.value)}
                placeholder="1.0"
                className="h-8 text-xs"
                step="0.1"
              />
            </div>

            {(nodeData.rotationType === "rotate_continuous" || nodeData.rotationType === "rotate_physics") && (
              <div className="space-y-2">
                <Label className="text-xs">Direction</Label>
                <Select value={nodeData.rotationDirection || "counterclockwise"} onValueChange={(v) => onDataChange("rotationDirection", v)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clockwise">Clockwise</SelectItem>
                    <SelectItem value="counterclockwise">Counter-clockwise</SelectItem>
                    <SelectItem value="pingpong">Pingpong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {nodeData.rotationType === "rotate_to_target" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Target Type</Label>
                  <Select value={nodeData.rotationTargetType || "position"} onValueChange={(v) => onDataChange("rotationTargetType", v)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="position">Position</SelectItem>
                      <SelectItem value="node">Node</SelectItem>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="player">Player</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Smooth</Label>
                  <Select value={nodeData.rotationSmoothing !== false ? "true" : "false"} onValueChange={(v) => onDataChange("rotationSmoothing", v === "true")}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Enabled</SelectItem>
                      <SelectItem value="false">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {nodeData.rotationType === "rotate_between_angles" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Min Angle</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationMinAngle || -45}
                    onChange={(e) => onDataChange("rotationMinAngle", e.target.value)}
                    className="h-8 text-xs"
                    step="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Max Angle</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationMaxAngle || 45}
                    onChange={(e) => onDataChange("rotationMaxAngle", e.target.value)}
                    className="h-8 text-xs"
                    step="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Duration (s)</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationDuration || 1.0}
                    onChange={(e) => onDataChange("rotationDuration", e.target.value)}
                    className="h-8 text-xs"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Easing</Label>
                  <Select value={nodeData.rotationEasing || "linear"} onValueChange={(v) => onDataChange("rotationEasing", v)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="sine">Sine</SelectItem>
                      <SelectItem value="quad">Quad</SelectItem>
                      <SelectItem value="cubic">Cubic</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {nodeData.rotationType === "rotate_snap" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Snap Angle</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationSnapAngle || 45}
                    onChange={(e) => onDataChange("rotationSnapAngle", e.target.value)}
                    className="h-8 text-xs"
                    step="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Smooth</Label>
                  <Select value={nodeData.rotationSmooth ? "true" : "false"} onValueChange={(v) => onDataChange("rotationSmooth", v === "true")}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Enabled</SelectItem>
                      <SelectItem value="false">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {nodeData.rotationType === "rotate_shake" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Intensity</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationIntensity || 0.5}
                    onChange={(e) => onDataChange("rotationIntensity", e.target.value)}
                    className="h-8 text-xs"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Duration (s)</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationDuration || 0.5}
                    onChange={(e) => onDataChange("rotationDuration", e.target.value)}
                    className="h-8 text-xs"
                    step="0.1"
                  />
                </div>
              </>
            )}

            {nodeData.rotationType === "rotate_physics" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs">Physics Method</Label>
                  <Select value={nodeData.rotationPhysicsMethod || "torque"} onValueChange={(v) => onDataChange("rotationPhysicsMethod", v)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="torque">Torque</SelectItem>
                      <SelectItem value="angular_velocity">Angular Velocity</SelectItem>
                      <SelectItem value="impulse">Impulse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Force</Label>
                  <Input
                    type="number"
                    value={nodeData.rotationForce || 100.0}
                    onChange={(e) => onDataChange("rotationForce", e.target.value)}
                    className="h-8 text-xs"
                    step="10"
                  />
                </div>
              </>
            )}
          </>
        )}

        {nodeType === "animation" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Animation Node Type</Label>
              <Select value={nodeData.animationNodeType || "AnimationPlayer"} onValueChange={(v) => onDataChange("animationNodeType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ANIMATION_NODE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Animation Name</Label>
              <Input
                value={nodeData.animationName || ""}
                onChange={(e) => onDataChange("animationName", e.target.value)}
                placeholder="idle"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Action</Label>
              <Select value={nodeData.animationAction || "play"} onValueChange={(v) => onDataChange("animationAction", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="play">Play</SelectItem>
                  <SelectItem value="stop">Stop</SelectItem>
                  <SelectItem value="seek">Seek</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Backward</Label>
              <Select value={String(nodeData.animationBackward === true ? "true" : "false")} onValueChange={(v) => onDataChange("animationBackward", v === "true")}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Forward</SelectItem>
                  <SelectItem value="true">Backward</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Speed</Label>
              <Input
                type="number"
                value={nodeData.animationSpeed || 1}
                onChange={(e) => onDataChange("animationSpeed", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
          </>
        )}

        {nodeType === "audio" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Audio Node Type</Label>
              <Select value={nodeData.audioNodeType || "AudioStreamPlayer"} onValueChange={(v) => onDataChange("audioNodeType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AUDIO_NODE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Audio File</Label>
              <Input
                value={nodeData.audioFile || ""}
                onChange={(e) => onDataChange("audioFile", e.target.value)}
                placeholder="res://sounds/effect.ogg"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Volume (0-1)</Label>
              <Input
                type="number"
                value={nodeData.audioVolume || 1}
                onChange={(e) => onDataChange("audioVolume", e.target.value)}
                className="h-8 text-xs"
                min="0"
                max="1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Loop</Label>
              <Select value={nodeData.audioLoop ? "true" : "false"} onValueChange={(v) => onDataChange("audioLoop", v === "true")}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {nodeType === "timer" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Duration (seconds)</Label>
              <Input
                type="number"
                value={nodeData.timerDuration || 1}
                onChange={(e) => onDataChange("timerDuration", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
                min="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Autostart</Label>
              <Select value={nodeData.timerAutostart ? "true" : "false"} onValueChange={(v) => onDataChange("timerAutostart", v === "true")}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {nodeType === "physics" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Physics Body Type</Label>
              <Select value={nodeData.physicsBodyType || "RigidBody2D"} onValueChange={(v) => onDataChange("physicsBodyType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PHYSICS_BODIES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Game Mode</Label>
              <Select value={nodeData.physicsGameMode || "2d"} onValueChange={(v) => onDataChange("physicsGameMode", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2d">2D</SelectItem>
                  <SelectItem value="3d">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Physics Type</Label>
              <Select value={nodeData.physicsType || "velocity"} onValueChange={(v) => onDataChange("physicsType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="velocity">Velocity</SelectItem>
                  <SelectItem value="force">Force</SelectItem>
                  <SelectItem value="impulse">Impulse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">X Value</Label>
              <Input
                type="number"
                value={nodeData.physicsX || 0}
                onChange={(e) => onDataChange("physicsX", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Y Value</Label>
              <Input
                type="number"
                value={nodeData.physicsY || 0}
                onChange={(e) => onDataChange("physicsY", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
            {nodeData.physicsGameMode === "3d" && (
              <div className="space-y-2">
                <Label className="text-xs">Z Value</Label>
                <Input
                  type="number"
                  value={nodeData.physicsZ || 0}
                  onChange={(e) => onDataChange("physicsZ", e.target.value)}
                  className="h-8 text-xs"
                  step="0.1"
                />
              </div>
            )}
          </>
        )}

        {nodeType === "spawn" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Node Type</Label>
              <Select value={nodeData.spawnNodeType || "Node2D"} onValueChange={(v) => onDataChange("spawnNodeType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SPAWN_NODE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Game Mode</Label>
              <Select value={nodeData.spawnGameMode || "2d"} onValueChange={(v) => onDataChange("spawnGameMode", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2d">2D</SelectItem>
                  <SelectItem value="3d">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Scene Path</Label>
              <Input
                value={nodeData.spawnScene || ""}
                onChange={(e) => onDataChange("spawnScene", e.target.value)}
                placeholder="res://scenes/enemy.tscn"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Position X</Label>
              <Input
                type="number"
                value={nodeData.spawnX || 0}
                onChange={(e) => onDataChange("spawnX", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Position Y</Label>
              <Input
                type="number"
                value={nodeData.spawnY || 0}
                onChange={(e) => onDataChange("spawnY", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
              />
            </div>
            {nodeData.spawnGameMode === "3d" && (
              <div className="space-y-2">
                <Label className="text-xs">Position Z</Label>
                <Input
                  type="number"
                  value={nodeData.spawnZ || 0}
                  onChange={(e) => onDataChange("spawnZ", e.target.value)}
                  className="h-8 text-xs"
                  step="0.1"
                />
              </div>
            )}
          </>
        )}

        {nodeType === "destroy" && (
          <div className="space-y-2">
            <Label className="text-xs">Delay (seconds)</Label>
            <Input
              type="number"
              value={nodeData.destroyDelay || 0}
              onChange={(e) => onDataChange("destroyDelay", e.target.value)}
              className="h-8 text-xs"
              step="0.1"
              min="0"
            />
          </div>
        )}

        {nodeType === "camera" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Camera Type</Label>
              <Select value={nodeData.cameraType || "Camera2D"} onValueChange={(v) => onDataChange("cameraType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Camera2D">Camera2D</SelectItem>
                  <SelectItem value="Camera3D">Camera3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Game Mode</Label>
              <Select value={nodeData.cameraGameMode || "2d"} onValueChange={(v) => onDataChange("cameraGameMode", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2d">2D</SelectItem>
                  <SelectItem value="3d">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Action</Label>
              <Select value={nodeData.cameraAction || "enable"} onValueChange={(v) => onDataChange("cameraAction", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enable">Enable</SelectItem>
                  <SelectItem value="disable">Disable</SelectItem>
                  <SelectItem value="set_target">Set Target</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={nodeData.cameraCurrent || false}
                onChange={(e) => onDataChange("cameraCurrent", e.target.checked)}
                className="w-4 h-4"
              />
              <Label className="text-xs cursor-pointer">Current Camera</Label>
            </div>
          </>
        )}

        {nodeType === "tween" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Game Mode</Label>
              <Select value={nodeData.tweenGameMode || "2d"} onValueChange={(v) => onDataChange("tweenGameMode", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2d">2D</SelectItem>
                  <SelectItem value="3d">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Duration (seconds)</Label>
              <Input
                type="number"
                value={nodeData.tweenDuration || 1}
                onChange={(e) => onDataChange("tweenDuration", e.target.value)}
                className="h-8 text-xs"
                step="0.1"
                min="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Easing</Label>
              <Select value={nodeData.tweenEasing || "Linear"} onValueChange={(v) => onDataChange("tweenEasing", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EASING_TYPES.map((ease) => (
                    <SelectItem key={ease} value={ease}>{ease}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Target Property</Label>
              <Input
                value={nodeData.tweenProperty || "position"}
                onChange={(e) => onDataChange("tweenProperty", e.target.value)}
                placeholder="position"
                className="h-8 text-xs"
              />
            </div>
          </>
        )}

        {nodeType === "group" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Group Name</Label>
              <Input
                value={nodeData.groupName || ""}
                onChange={(e) => onDataChange("groupName", e.target.value)}
                placeholder="enemies"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Action</Label>
              <Select value={nodeData.groupAction || "add"} onValueChange={(v) => onDataChange("groupAction", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add</SelectItem>
                  <SelectItem value="remove">Remove</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {nodeType === "property" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Game Mode</Label>
              <Select value={nodeData.propertyGameMode || "2d"} onValueChange={(v) => onDataChange("propertyGameMode", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2d">2D</SelectItem>
                  <SelectItem value="3d">3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Node Path</Label>
              <Input
                value={nodeData.propertyNodePath || "."}
                onChange={(e) => onDataChange("propertyNodePath", e.target.value)}
                placeholder="."
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Property Name</Label>
              <Input
                value={nodeData.propertyName || ""}
                onChange={(e) => onDataChange("propertyName", e.target.value)}
                placeholder="velocity"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Value</Label>
              <Input
                value={nodeData.propertyValue || ""}
                onChange={(e) => onDataChange("propertyValue", e.target.value)}
                placeholder="0"
                className="h-8 text-xs"
              />
            </div>
          </>
        )}

        {nodeType === "input_check" && (
          <div className="space-y-2">
            <Label className="text-xs">Input Type</Label>
            <Select value={nodeData.inputCheckType || "action"} onValueChange={(v) => onDataChange("inputCheckType", v)}>
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="key">Key</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {nodeType === "scene" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Scene Path</Label>
              <Input
                value={nodeData.scenePath || ""}
                onChange={(e) => onDataChange("scenePath", e.target.value)}
                placeholder="res://scenes/level1.tscn"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Action</Label>
              <Select value={nodeData.sceneAction || "change"} onValueChange={(v) => onDataChange("sceneAction", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="change">Change Scene</SelectItem>
                  <SelectItem value="load">Load Resource</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {nodeType === "collision" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Collision Type</Label>
              <Select value={nodeData.collisionType || "Area2D"} onValueChange={(v) => onDataChange("collisionType", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Area2D">Area2D</SelectItem>
                  <SelectItem value="Area3D">Area3D</SelectItem>
                  <SelectItem value="CharacterBody2D">CharacterBody2D</SelectItem>
                  <SelectItem value="CharacterBody3D">CharacterBody3D</SelectItem>
                  <SelectItem value="RigidBody2D">RigidBody2D</SelectItem>
                  <SelectItem value="RigidBody3D">RigidBody3D</SelectItem>
                  <SelectItem value="StaticBody2D">StaticBody2D</SelectItem>
                  <SelectItem value="StaticBody3D">StaticBody3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Detect Signal</Label>
              <Select value={nodeData.collisionDetect || "body_entered"} onValueChange={(v) => onDataChange("collisionDetect", v)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="body_entered">Body Entered</SelectItem>
                  <SelectItem value="body_exited">Body Exited</SelectItem>
                  <SelectItem value="area_entered">Area Entered</SelectItem>
                  <SelectItem value="area_exited">Area Exited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {nodeType === "data" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Data Key</Label>
              <Input
                value={nodeData.dataKey || ""}
                onChange={(e) => onDataChange("dataKey", e.target.value)}
                placeholder="player_score"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Data Value</Label>
              <Input
                value={nodeData.dataValue || ""}
                onChange={(e) => onDataChange("dataValue", e.target.value)}
                placeholder="0"
                className="h-8 text-xs"
              />
            </div>
          </>
        )}

        {nodeType === "code" && (
          <div className="space-y-2">
            <Label className="text-xs">Custom GDScript Code</Label>
            <Textarea
              value={nodeData.customCode || ""}
              onChange={(e) => onDataChange("customCode", e.target.value)}
              placeholder='var x = 10\nprint("Custom code")'
              className="text-xs h-32"
            />
          </div>
        )}

        {nodeType === "print" && (
          <div className="space-y-2">
            <Label className="text-xs">Print Text</Label>
            <Input
              value={nodeData.printText || ""}
              onChange={(e) => onDataChange("printText", e.target.value)}
              placeholder="Text to print"
              className="h-8 text-xs"
            />
          </div>
        )}

        {nodeType === "comment" && (
          <div className="space-y-2">
            <Label className="text-xs">Comment Text</Label>
            <Textarea
              value={nodeData.commentText || ""}
              onChange={(e) => onDataChange("commentText", e.target.value)}
              placeholder="Comment to add"
              className="text-xs min-h-20"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
