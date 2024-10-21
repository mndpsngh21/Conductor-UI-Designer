// src/TestFlow.js

import React from 'react';
import { useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap,  useNodesState,
    useEdgesState,
    addEdge } from 'react-flow-renderer';

const TestFlow = () => {
    const initialNodes = [
        { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 300, y: 100 } },
    ];

    const initialEdges = [
        { id: 'e1-2', source: '1', target: '2' },
    ];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
    return (
        <div style={{ height: '100vh' }}>
                <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};

export default TestFlow;
