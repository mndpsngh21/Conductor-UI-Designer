// src/components/NodeOptions.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import nodeOptions from '../data/nodeOptions';
import { WorkflowContext } from '../context/WorkflowContext';

const OptionsContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 8px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const NodeOptions = ({ node }) => {
  const { addNode } = useContext(WorkflowContext);

  // Positioning the options container relative to the node's position
  const containerStyle = {
    top: node.position.y + 100,
    left: node.position.x + 150,
  };

  const handleOptionClick = (option) => {
    addNode(node, option);
  };

  const options = nodeOptions[node.type] || [];

  if (options.length === 0) return null;

  return (
    <OptionsContainer style={containerStyle}>
      {options.map((option, index) => (
        <OptionButton key={index} onClick={() => handleOptionClick(option)}>
          {option.label}
        </OptionButton>
      ))}
    </OptionsContainer>
  );
};

export default NodeOptions;
