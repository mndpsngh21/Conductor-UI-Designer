// src/components/PropertiesPanel.js

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { WorkflowContext } from '../context/WorkflowContext';

const Panel = styled.div`
  position: absolute;
  right: 220px; /* Adjust based on Sidebar width */
  top: 10px;
  width: 200px;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  box-sizing: border-box;
`;

const PropertiesPanel = ({ node }) => {
  const { nodes, setNodes } = useContext(WorkflowContext);
  const [label, setLabel] = useState(node.data.label);

  useEffect(() => {
    setLabel(node.data.label);
  }, [node]);

  const handleChange = (e) => {
    setLabel(e.target.value);
  };

  const handleBlur = () => {
    const updatedNodes = nodes.map((n) =>
      n.id === node.id ? { ...n, data: { ...n.data, label } } : n
    );
    setNodes(updatedNodes);
  };

  return (
    <Panel>
      <h4>Properties</h4>
      <label>
        Label:
        <Input
          type="text"
          value={label}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </label>
    </Panel>
  );
};

export default PropertiesPanel;
