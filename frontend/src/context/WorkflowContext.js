// src/context/WorkflowContext.js

import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import nodeOptions from '../data/nodeOptions';

export const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'start',
      data: { label: 'Start' },
      position: { x: 250, y: 5 },
    },
  ]);

  const [edges, setEdges] = useState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const addNode = (sourceNode, option) => {
    const newNodeId = uuidv4();
    const newNode = {
      id: newNodeId,
      type: option.type,
      data: { label: option.label },
      position: {
        x: sourceNode.position.x + 150,
        y: sourceNode.position.y + 100,
      },
    };

    const newNodes = [...nodes, newNode];
    const newEdge = {
      id: `${sourceNode.id}-${newNodeId}`,
      source: sourceNode.id,
      target: newNodeId,
    };
    const newEdges = [...edges, newEdge];

    setHistory([...history, { nodes, edges }]);
    setFuture([]);

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const updateNode = (id, newData) => {
    const updatedNodes = nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
    );

    setHistory([...history, { nodes, edges }]);
    setFuture([]);

    setNodes(updatedNodes);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);
    setFuture([{ nodes, edges }, ...future]);
    setNodes(previous.nodes);
    setEdges(previous.edges);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setHistory([...history, { nodes, edges }]);
    setFuture(newFuture);
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  const saveWorkflow = (workflowName, version) => {
    const workflowDef = {
      name: workflowName,
      version: version,
      tasks: nodes.map((node) => ({
        name: node.data.label,
        taskReferenceName: node.id,
        type: node.type,
        // Add additional task properties as needed
      })),
      // Define workflow-level properties
    };

    // Integrate with Netflix Conductor API
    // Example: createWorkflow(workflowDef).then(...).catch(...);
  };

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        addNode,
        updateNode,
        undo,
        redo,
        saveWorkflow,
      }}
    >
      Demo
      {children}
    </WorkflowContext.Provider>
  );
};
