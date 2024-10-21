// src/Flow.js

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from 'react-flow-renderer';
import Sidebar from './components/Sidebar';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';

// Define node styles
const nodeStyles = {
  start: { background: '#28a745', color: '#fff' },
  task: { background: '#17a2b8', color: '#fff' },
  decision: { background: '#ffc107', color: '#fff' },
  end: { background: '#dc3545', color: '#fff' },
};

// Define custom node types with Handles
const nodeTypes = {
  start: ({ data }) => (
    <div style={{
      padding: '10px',
      background: nodeStyles.start.background,
      color: nodeStyles.start.color,
      borderRadius: '4px',
      border: '1px solid #222',
      position: 'relative',
    }}>
      {data.label}
      {/* Handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#000' }}
      />
    </div>
  ),
  task: ({ data }) => (
    <div style={{
      padding: '10px',
      background: nodeStyles.task.background,
      color: nodeStyles.task.color,
      borderRadius: '4px',
      border: '1px solid #222',
      position: 'relative',
    }}>
      {data.label}
      {/* Handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#000' }}
      />
      {/* Handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#000' }}
      />
    </div>
  ),
  decision: ({ data }) => (
    <div style={{
      padding: '10px',
      background: nodeStyles.decision.background,
      color: nodeStyles.decision.color,
      borderRadius: '4px',
      border: '1px solid #222',
      position: 'relative',
    }}>
      {data.label}
      {/* Handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      {/* Handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
    </div>
  ),
  end: ({ data }) => (
    <div style={{
      padding: '10px',
      background: nodeStyles.end.background,
      color: nodeStyles.end.color,
      borderRadius: '4px',
      border: '1px solid #222',
      position: 'relative',
    }}>
      {data.label}
      {/* Handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
    </div>
  ),
};

const Flow = () => {
  // Initialize nodes and edges with useNodesState and useEdgesState hooks
  const initialNodes = [
    {
      id: '1',
      type: 'start',
      data: { label: 'Start' },
      position: { x: 250, y: 5 },
      style: nodeStyles.start,
    },
    {
      id: '2',
      type: 'task',
      data: { label: 'Task 1' },
      position: { x: 250, y: 100 },
      style: nodeStyles.task,
    },
    {
      id: '3',
      type: 'task',
      data: { label: 'Task 2' },
      position: { x: 250, y: 200 },
      style: nodeStyles.task,
    },
    {
      id: '4',
      type: 'end',
      data: { label: 'End' },
      position: { x: 250, y: 300 },
      style: nodeStyles.end,
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnectHandler = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flow-container" style={{ height: '100vh', display: 'flex' }}>
      <Sidebar addNode={(type) => {
        // Calculate position based on number of nodes
        const newNodeId = `${nodes.length + 1}`;
        const position = { x: 250, y: nodes.length * 100 + 5 };
        const newNode = {
          id: newNodeId,
          type: type, // Should match nodeTypes
          data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${newNodeId}` },
          position,
          style: nodeStyles[type],
        };
        console.log("Adding new node:", newNode); // Debug log
        setNodes((nds) => nds.concat(newNode));
      }} />
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectHandler}
          nodeTypes={nodeTypes}
          fitView
          style={{ width: '100%', height: '100%' }}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <MiniMap nodeColor={(node) => {
            switch (node.type) {
              case 'start':
                return '#28a745';
              case 'task':
                return '#17a2b8';
              case 'decision':
                return '#ffc107';
              case 'end':
                return '#dc3545';
              default:
                return '#eee';
            }
          }} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Flow;
