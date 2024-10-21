import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CustomNode = ({ data, openModal }) => {
  console.log('CustomNode props:', { data, openModal }); // Debugging
  const buttonId = `btn${data.id}`;  
  return (
    <div style={styles.container}>
      <div>{data.label}</div>
      {/* Button to add the next node */}
      <button className="add-task-icon" id={buttonId} onClick={() => openModal(data.id,buttonId )}>
      <FontAwesomeIcon icon={faPlus} size="2xs" />
      </button>
      {/* Handle for incoming connections */}
      {data.type !== 'start' && (
        <Handle
          type="target"
          position={Position.Top}
          style={styles.handle}
        />
      )}
      {/* Handle for outgoing connections */}
      {data.type !== 'end' && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={styles.handle}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    background: '#fff',
    color: '#000',
    borderRadius: '4px',
    border: '1px solid #222',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '100px',
  },
  button: {
    marginTop: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '12px',
  },
  handle: {
    background: '#555',
  },
};

export default CustomNode;
