import React from 'react';

const TaskComponent = ({ task, onAddNextTask }) => {
  return (
    <div className="task-box">
      <div className="task-header">
        <h3>{task.name}</h3>
        <p>{task.type}</p>
      </div>
      <div className="task-body">
        {/* Input Parameters for the task can be shown here */}
        <p>{JSON.stringify(task.inputParameters)}</p>
      </div>
      <div className="task-footer">
        <button onClick={() => onAddNextTask(task.id)}>+</button>
      </div>
    </div>
  );
};

export default TaskComponent;
