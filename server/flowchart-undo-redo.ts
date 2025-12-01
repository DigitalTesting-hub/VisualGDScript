import type { FlowchartNode, FlowchartEdge } from "@shared/schema";

export interface FlowchartState {
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
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
    this.addToHistory(initialState, "Initial state");
  }

  addToHistory(state: FlowchartState, description: string): void {
    // Remove any history after current index
    this.history = this.history.slice(0, this.currentIndex + 1);

    this.history.push({
      state: JSON.parse(JSON.stringify(state)), // Deep copy
      description,
      timestamp: Date.now(),
    });

    // Limit history size
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

  getCurrentState(): FlowchartState {
    return JSON.parse(JSON.stringify(this.history[this.currentIndex].state));
  }

  getHistory(): HistoryEntry[] {
    return this.history.map((entry) => ({
      ...entry,
      state: JSON.parse(JSON.stringify(entry.state)),
    }));
  }

  clear(): void {
    const currentState = this.getCurrentState();
    this.history = [{ state: currentState, description: "Reset", timestamp: Date.now() }];
    this.currentIndex = 0;
  }
}
