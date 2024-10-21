// src/useWorkflowStore.js

import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useWorkflowStore = create((set) => ({
  nodes: [
    {
      id: '1',
      type: 'start',
      data: { label: 'Start' },
      position: { x: 250, y: 5 },
    },
  ],
  edges: [],
  addNode: (type, position) => {
    const id = uuidv4();
    set((state) => ({
      nodes: [
        ...state.nodes,
        { id, type, data: { label: type }, position },
      ],
    }));
  },
  addEdge: (source, target) => {
    set((state) => ({
      edges: [...state.edges, { id: `${source}-${target}`, source, target }],
    }));
  },
  // Other actions like removing nodes/edges, etc., can be added here
}));

export default useWorkflowStore;
