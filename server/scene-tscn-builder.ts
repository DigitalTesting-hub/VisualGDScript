/**
 * TSCN (Godot Scene Format) Builder
 * Generates valid Godot scene files in TSCN format
 */

export interface SceneNode {
  name: string;
  type: string;
  properties?: Record<string, string>;
  children?: SceneNode[];
}

export function generateTSCN(sceneStructure: SceneNode): string {
  const lines: string[] = [];

  // TSCN Header
  lines.push('[gd_scene load_steps=2 format=3 uid="uid://scene_auto_generated"]');
  lines.push('[ext_resource type="Script" path="res://main.gd"]');
  lines.push('');

  // Root node
  lines.push(`[node name="${sceneStructure.name}" type="${sceneStructure.type}"]`);
  if (sceneStructure.properties) {
    Object.entries(sceneStructure.properties).forEach(([key, value]) => {
      lines.push(`${key} = ${formatValue(value)}`);
    });
  }
  lines.push('');

  // Child nodes recursively
  if (sceneStructure.children && sceneStructure.children.length > 0) {
    addChildNodes(lines, sceneStructure.children, '');
  }

  return lines.join('\n');
}

function addChildNodes(lines: string[], children: SceneNode[], parentPath: string): void {
  children.forEach((child) => {
    lines.push(`[node name="${child.name}" type="${child.type}" parent="${parentPath || '.'}"]`);
    
    if (child.properties) {
      Object.entries(child.properties).forEach(([key, value]) => {
        lines.push(`${key} = ${formatValue(value)}`);
      });
    }
    
    lines.push('');

    // Recursively add children
    if (child.children && child.children.length > 0) {
      const newPath = parentPath ? `${parentPath}/${child.name}` : child.name;
      addChildNodes(lines, child.children, newPath);
    }
  });
}

function formatValue(value: string): string {
  // Handle common types
  if (value === 'true' || value === 'false') return value;
  if (!isNaN(parseFloat(value))) return value;
  if (value.startsWith('Vector2') || value.startsWith('Vector3') || value.startsWith('Color')) return value;
  if (value.startsWith('res://')) return `"${value}"`;
  return `"${value}"`;
}

// Parse simple scene code format
export function parseSceneCode(code: string): SceneNode {
  const lines = code.trim().split('\n').filter((l) => l.trim());
  
  const root: SceneNode = {
    name: 'Scene',
    type: 'Node2D',
    children: [],
  };

  let currentLevel = root;
  const stack: SceneNode[] = [root];

  lines.forEach((line) => {
    const indent = line.search(/\S/);
    const trimmed = line.trim();

    // Parse node definition: "NodeName (Type)" or just "NodeName"
    const match = trimmed.match(/^([\w]+)\s*(?:\(([\w]+)\))?/);
    if (!match) return;

    const [, nodeName, nodeType] = match;

    // Create new node
    const newNode: SceneNode = {
      name: nodeName,
      type: nodeType || 'Node',
      children: [],
    };

    // Adjust stack based on indentation
    while (stack.length > 1 && indent <= (stack.length - 2) * 2) {
      stack.pop();
    }

    // Add to current parent
    const parent = stack[stack.length - 1];
    if (!parent.children) parent.children = [];
    parent.children.push(newNode);

    // Update stack if indented
    if (indent > 0) {
      stack.push(newNode);
    }
  });

  return root;
}
