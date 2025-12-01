import type { Node, Edge } from 'reactflow';

export interface FlowchartState {
  nodes: Node[];
  edges: Edge[];
}

export interface HistoryEntry {
  state: FlowchartState;
  description: string;
  timestamp: number;
}

export class UndoRedoManager {
  private history: HistoryEntry[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  constructor(initialState: FlowchartState) {
    this.addToHistory(initialState, 'Initial state');
  }

  addToHistory(state: FlowchartState, description: string): void {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push({
      state: JSON.parse(JSON.stringify(state)),
      description,
      timestamp: Date.now(),
    });

    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  undo(): FlowchartState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex].state));
    }
    return null;
  }

  redo(): FlowchartState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex].state));
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }
}
