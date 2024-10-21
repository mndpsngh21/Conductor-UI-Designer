// src/components/SaveLoad.js

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { WorkflowContext } from '../context/WorkflowContext';

const Button = styled.button`
  margin: 5px 0;
  padding: 8px 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #45a049;
  }
`;

const LoadInput = styled.input`
  margin: 5px 0;
  padding: 8px;
  width: 100%;
`;

const SaveLoad = () => {
  const { nodes, edges, setNodes, setEdges, saveWorkflow } = useContext(WorkflowContext);
  const [workflowName, setWorkflowName] = useState('');
  const [version, setVersion] = useState('');

  const handleSave = () => {
    if (!workflowName || !version) {
      alert('Please provide Workflow Name and Version');
      return;
    }
    saveWorkflow(workflowName, version);
    alert('Workflow saved successfully!');
  };

  const handleLoad = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div>
      <Button onClick={handleSave}>Save Workflow to Conductor</Button>
      <input
        type="text"
        placeholder="Workflow Name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      <input
        type="text"
        placeholder="Version"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      <Button onClick={handleSave}>Save Workflow</Button>
      <LoadInput type="file" accept="application/json" onChange={handleLoad} />
    </div>
  );
};

export default SaveLoad;
