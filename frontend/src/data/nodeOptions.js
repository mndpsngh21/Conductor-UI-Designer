// src/data/nodeOptions.js

const nodeOptions = {
    start: [
      { label: 'Task', type: 'task' },
      { label: 'Decision', type: 'decision' },
    ],
    task: [
      { label: 'Task', type: 'task' },
      { label: 'End', type: 'end' },
    ],
    decision: [
      { label: 'Task Yes', type: 'task' },
      { label: 'Task No', type: 'task' },
    ],
    end: [],
  };
  
  export default nodeOptions;
  