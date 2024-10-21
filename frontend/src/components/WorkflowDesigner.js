import React, { useState } from 'react';
import DragAndDropTask from './DragAndDropTask';
import update from 'immutability-helper';

const WorkflowDesigner = () => {
  const [tasks, setTasks] = useState([
    {
      id: 'task_1',
      name: 'Task 1',
      type: 'SIMPLE',
      referenceName: 'task_1_ref',
      inputParameters: {},
      nextTask: null,
    },
    {
      id: 'task_2',
      name: 'Task 2',
      type: 'SIMPLE',
      referenceName: 'task_2_ref',
      inputParameters: {},
      nextTask: null,
    },
  ]);

  // Function to handle task reordering after drag-and-drop
  const moveTask = (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];
    const updatedTasks = update(tasks, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedTask],
      ],
    });
    setTasks(updatedTasks);
  };

  // Function to add a new task
  const addTask = (prevTaskId) => {
    const newTask = {
      id: `task_${tasks.length + 1}`,
      name: 'New Task',
      type: 'SIMPLE',
      referenceName: `task_ref_${tasks.length + 1}`,
      inputParameters: {},
      nextTask: null,
    };

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === prevTaskId ? { ...task, nextTask: newTask.id } : task
      ).concat(newTask)
    );
  };

  return (
    <div className="workflow-designer">
      {tasks.map((task, index) => (
        <DragAndDropTask
          key={task.id}
          index={index}
          task={task}
          moveTask={moveTask}
          onAddNextTask={addTask} // Passing the addTask function to handle the "+" click
        />
      ))}
    </div>
  );
};

export default WorkflowDesigner;
