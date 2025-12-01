# Flowchart Connection Model - Multiple Outputs Support

## Connection Rules (Updated)

### Input Connections (Top Handle)
- **All nodes except START**: Exactly **1 input connection** allowed
- **START node**: No inputs (entry point)
- Single top handle for incoming execution flow

### Output Connections (Bottom Handle)
- **START node**: **1 output** only
- **All other nodes**: **Unlimited outputs** (multiple connections allowed)
- Multiple bottom handles for branching execution flow

---

## Visual Model

```
          ┌─────────────────────┐
          │   START NODE        │
          │  (Entry Point)      │
          │                     │
          │  Outputs: 1 only    │
          └──────────┬──────────┘
                     │ exec
     ┌───────────────┼───────────────┐
     │               │               │
     v               v               v
┌─────────┐    ┌─────────┐    ┌─────────┐
│ EVENT   │    │ PRINT   │    │ IF      │
│ Node    │    │ Node    │    │ Node    │
│         │    │         │    │         │
│ Input:1 │    │ Input:1 │    │ Input:1 │
│Output:∞ │    │Output:∞ │    │Output:∞ │
└────┬────┘    └────┬────┘    └──┬──┬───┘
     │              │            │  │
   (3 outputs)   (1 output)  (true)(false)
     │              │            │  │
     ├──────┬───────┴─────┬──────┘  │
     │      │             │         │
     v      v             v         v
  [Node] [Node]       [Node]    [Node]
```

---

## Node Type Constraints (All 23 Nodes)

| Node Type | Max Input | Max Output | Description |
|-----------|-----------|------------|-------------|
| **START** | 0 | 1 | Entry point - no input, one output |
| **EVENT** | 1 | ∞ | One top input, unlimited bottom outputs |
| **IF** | 1 | ∞ | Branches to true/false paths |
| **LOOP_FOR** | 1 | ∞ | Multiple outputs (body + complete) |
| **LOOP_WHILE** | 1 | ∞ | Multiple outputs (body + complete) |
| **VAR_GET** | 1 | ∞ | Value + exec outputs |
| **VAR_SET** | 1 | ∞ | One exec output |
| **MOVE_VELOCITY** | 1 | ∞ | One exec output |
| **MOVE_AND_SLIDE** | 1 | ∞ | Collision + no collision + exec |
| **IS_ON_FLOOR** | 1 | ∞ | On floor + in air branches |
| **APPLY_GRAVITY** | 1 | ∞ | One exec output |
| **APPLY_FORCE** | 1 | ∞ | One exec output |
| **COLLISION_DETECT** | 1 | ∞ | Collider + exec outputs |
| **PLAY_ANIMATION** | 1 | ∞ | One exec output |
| **STOP_ANIMATION** | 1 | ∞ | One exec output |
| **PLAY_AUDIO** | 1 | ∞ | One exec output |
| **INPUT_ACTION** | 1 | ∞ | Yes + no branches |
| **MATH_OP** | 1 | ∞ | Result output |
| **LOGIC_AND** | 1 | ∞ | Boolean result |
| **LOGIC_OR** | 1 | ∞ | Boolean result |
| **TIMER_START** | 1 | ∞ | One exec output (after timeout) |
| **PRINT** | 1 | ∞ | One exec output |
| **COMMENT** | 0 | 0 | No inputs/outputs (documentation only) |

---

## Schema Implementation

All nodes now include constraints:

```typescript
constraints: {
  maxInputConnections: 1,   // Only one top input (except START: 0)
  maxOutputConnections: -1  // Unlimited bottom outputs (-1)
}

// Output position
outputs: [
  { 
    id: "exec", 
    label: "Execute", 
    type: "execution",
    position: "bottom"  // All outputs at bottom
  }
]
```

---

## UI Implementation Guide

When rendering nodes, enforce these rules:

### Input (Top Handle)
- Show single top handle for non-START nodes
- Allow only 1 connection to drag to bottom handle of previous node
- Show error if attempting 2+ top connections

### Output (Bottom Handle)
- Show all output handles at bottom (multiple positions)
- Allow unlimited connections to node bottom outputs
- Stack multiple output handles vertically or horizontally as needed

### ReactFlow Configuration
```typescript
// Use bottom handle for all outputs
<Handle position={Position.Bottom} id="true_exec" />
<Handle position={Position.Bottom} id="false_exec" />

// Use top handle for input
<Handle position={Position.Top} id="input" />

// For START: no top handle
// For COMMENT: no handles
```

---

## Example: Complex Flow with Multiple Outputs

```
START
  ↓ (1 output only)
EVENT (process)
  ├─ Output 1 → IF (condition)
  ├─ Output 2 → PRINT (debug)
  └─ Output 3 → VAR_GET (health)
       ↓
    IF condition
    ├─ True → PLAY_ANIMATION (attack)
    └─ False → PLAY_ANIMATION (idle)
```

Each node in the flow:
- **START**: 1 output connection
- **EVENT**: 3 output connections (multiple)
- **IF**: 2 output connections (true/false branches)
- **PLAY_ANIMATION**: 1 output connection (next node)
- All have **max 1 input** connection at top

---

## API Compatibility

The `/api/flowchart/generate` endpoint already supports this model. Send edges for multiple outputs:

```json
{
  "edges": [
    { "source": "start", "target": "event", "sourceHandle": "exec" },
    { "source": "event", "target": "print", "sourceHandle": "exec" },
    { "source": "event", "target": "if", "sourceHandle": "exec" },
    { "source": "if", "target": "play_anim", "sourceHandle": "true_exec" }
  ]
}
```

---

**Status**: ✅ Schema updated - ready for UI implementation with multiple output support
