// src/components/Sidebar.js

import React from 'react';

const Sidebar = ({ addNode }) => {
  return (
    <div className="sidebar" style={{
      padding: '20px',
      borderRight: '1px solid #ddd',
      width: '200px',
      backgroundColor: '#f7f7f7'
    }}>
      <h2>Workflow Editor</h2>
      <button
        onClick={() => {
          const type = 'task';
          addNode(type);
        }}
        style={{
          marginBottom: '10px',
          padding: '10px',
          width: '100%',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        Add Task
      </button>
      <button
        onClick={() => {
          const type = 'decision';
          addNode(type);
        }}
        style={{
          marginBottom: '10px',
          padding: '10px',
          width: '100%',
          cursor: 'pointer',
          backgroundColor: '#ffc107',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        Add Decision
      </button>
      <button
        onClick={() => {
          const type = 'end';
          addNode(type);
        }}
        style={{
          marginBottom: '10px',
          padding: '10px',
          width: '100%',
          cursor: 'pointer',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        Add End
      </button>
    </div>
  );
};

export default Sidebar;
