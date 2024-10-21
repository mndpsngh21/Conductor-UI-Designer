import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';
import CustomNode from './nodetypes/CustomNode.js';
import Start from './nodetypes/Start.js';
import Modal from 'react-modal';
import './styles.css'; // Ensure you have the necessary styles
import TaskPopup from './components/TaskPopup';

// Define node styles
const nodeStyles = {
  start1: { background: '#28a745', color: '#fff' },
  task: { background: '#17a2b8', color: '#fff' },
  decision: { background: '#ffc107', color: '#fff' },
  end: { background: '#dc3545', color: '#fff' },
};

const Flow = () => {
  // Initialize nodes and edges with useNodesState and useEdgesState hooks
  const initialNodes = [
    {
      id: 'node-1',
      type: 'StartNode',
      data: { label: 'Start', type: 'StartNode', id :'1' },
      position: { x: 250, y: 5 },
      style: nodeStyles.start,
    },
  ];

  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    // Modal styles
// src/Flow.js

const  modalStyles = {
    content: {    
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',      
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      zIndex: 1000, // Added z-index
      overflow: 'inherit',
      
    },
    overlay: {    
      zIndex: 999, // Ensure overlay covers everything beneath
    }
  };


  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [currentNodeId, setCurrentNodeId] = useState(null);

  const [mStyle, setModalStyles] = useState(modalStyles);


  


  // Function to open the modal
  const openModal = useCallback((nodeId, callerID) => {

    setCurrentNodeId(nodeId);
    setModalIsOpen(true);
    const element = document.getElementById(callerID);
    const btnBottom= element.getBoundingClientRect().y;
    var existing = mStyle;
    existing.content.top= btnBottom+ 200 + 'px';
    setModalStyles(existing);
  }, []);

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentNodeId(null);
  };

  // Function to handle node type selection from modal
  const handleNodeTypeSelection = (type) => {
    if (!currentNodeId) {
      closeModal();
      return;
    }

    // Find the position of the current node
    const currentNode = nodes.find((node) => node.id === currentNodeId);
    if (!currentNode) {
      closeModal();
      return;
    }

    // Define new node ID
    const newNodeId = `${nodes.length + 1}`;

    // Position the new node below the current node
    const newPosition = { x: currentNode.position.x, y: currentNode.position.y + 100 };

    // Define the new node
    const newNode = {
      id: newNodeId,
      type: 'customNode',
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}`, type , id: newNodeId },
      position: newPosition,
      style: nodeStyles[type],
    };

    // Add the new node
    setNodes((nds) => nds.concat(newNode));

    // Add the edge connecting current node to the new node
    const newEdge = {
      id: `e${currentNodeId}-${newNodeId}`,
      source: currentNodeId,
      target: newNodeId,
      animated: true,
    };
    setEdges((eds) => eds.concat(newEdge));

    // Close the modal
    closeModal();
  };

  const onConnectHandler = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Memoize nodeTypes to prevent recreation on each render
  const nodeTypesDefinition = useMemo(() => {
    return {
      customNode: (props) => <CustomNode {...props} openModal={openModal} />,
      All : (props) => <CustomNode {...props} openModal={openModal}/>,
      StartNode : (props) => <Start {...props} openModal={openModal}/>,
    };
  }, [openModal]);
  const tasks = [
    { id: '1', name: 'Worker Task (Simple)', description: 'Runs a Worker task.', icon: '🔧', type: 'All' },
    { id: '2', name: 'Event Task', description: 'Runs an event task.', icon: '📅', type: 'customNode' },
    { id: '3', name: 'HTTP Task', description: 'Call an HTTP endpoint.', icon: '🌐', type: 'System' },
    // Add more tasks as needed
  ];

  

  const onTaskSelect = (task) => {

    const currentNode = nodes.find((node) => node.id === `node-${nodes.length}`);

    if (!currentNode) {
        closeModal();
        return;
      }
  
      // Define new node ID
      const newNodeId = `${nodes.length + 1}`;
  
      // Position the new node below the current node
      const newPosition = { x: currentNode.position.x, y: currentNode.position.y + 100 };

    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: task.type, // task.type should match the type of your custom node
      position: newPosition,
      data: { label: task.name }
    };

       // Add the edge connecting current node to the new node
       const newEdge = {
        id: `e${nodes.length}-${nodes.length + 1}`,
        source: `node-${nodes.length}`,
        target: `node-${nodes.length+1}`,
        animated: true,
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    closeModal(); // Close the modal after task selection
  };

  return (
    <div className="flow-container">
      {/* Sidebar can remain as is or be repurposed */}
      <div className="sidebar">
        <h2>Workflow Editor</h2>
        {/* Sidebar functionality can be added here if needed */}
      </div>
      <div className="reactflow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectHandler}
          nodeTypes={nodeTypesDefinition} // Use the memoized nodeTypes
          fitView
          style={{ width: '100%', height: '100%' }}
        >
          <Background color="#aaa" gap={16} />
          <Controls />
          <MiniMap nodeColor={(node) => nodeStyles[node.data.type]?.background || '#eee'} />
        </ReactFlow>
      </div>

      {/* Modal for selecting the next node type */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select Next Node Type"
        ariaHideApp={false} // Set to true in production and bind modal to your appElement
        style={mStyle}
        shouldCloseOnOverlayClick={true}
      >
        <TaskPopup tasks={tasks} onTaskSelect={onTaskSelect} closeModal={closeModal}/>
        {/* <h2>Select Next Node Type</h2>
        <div style={modalContentStyles}>
          <button
            onClick={() => handleNodeTypeSelection('task')}
            style={{ ...buttonStyles, backgroundColor: nodeStyles.task.background }}
          >
            Task
          </button>
          <button
            onClick={() => handleNodeTypeSelection('decision')}
            style={{ ...buttonStyles, backgroundColor: nodeStyles.decision.background }}
          >
            Decision
          </button>
          <button
            onClick={() => handleNodeTypeSelection('end')}
            style={{ ...buttonStyles, backgroundColor: nodeStyles.end.background }}
          >
            End
          </button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button onClick={closeModal} style={cancelButtonStyles}>
            Cancel
          </button>
        </div> */}
      </Modal>
    </div>
  );
};


// Modal content styles
const modalContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

// Button styles
const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
};

// Cancel button styles
const cancelButtonStyles = {
  padding: '8px 16px',
  backgroundColor: '#6c757d',
  border: 'none',
  borderRadius: '4px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
};

export default Flow;
