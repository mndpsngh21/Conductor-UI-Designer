// src/components/UndoRedo.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import { WorkflowContext } from '../context/WorkflowContext';

const Button = styled.button`
  margin: 5px 2px;
  padding: 8px 12px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;

  &:hover {
    background: #5a6268;
  }

  &:disabled {
    background: #c6c8ca;
    cursor: not-allowed;
  }
`;

const UndoRedoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const UndoRedo = () => {
  const { undo, redo, history, future } = useContext(WorkflowContext);

  return (
    <UndoRedoContainer>
      <Button onClick={undo} disabled={history.length === 0}>
        Undo
      </Button>
      <Button onClick={redo} disabled={future.length === 0}>
        Redo
      </Button>
    </UndoRedoContainer>
  );
};

export default UndoRedo;
