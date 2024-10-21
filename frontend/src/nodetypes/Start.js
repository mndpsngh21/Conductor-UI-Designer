import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Start = ({ data, openModal }) => {
  console.log('Start props:', { data, openModal }); // Debugging
  const buttonId = `btn${data.id}`;  
  const flexDirection = { flexDirection: 'row' };
  return (
    <div className="start-circle">
    
      <div style={flexDirection}>{data.label}</div>
      <br></br>
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


  handle: {
    background: '#555',
  },
};

export default Start;
