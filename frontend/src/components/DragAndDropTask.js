import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskComponent from './TaskComponent';

const DragAndDropTask = ({ task, index, moveTask, onAddNextTask }) => {
  const [, ref] = useDrop({
    accept: 'TASK',
    hover(draggedTask) {
      if (draggedTask.index !== index) {
        moveTask(draggedTask.index, index);
        draggedTask.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={(node) => drag(ref(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <TaskComponent task={task} onAddNextTask={onAddNextTask} />
    </div>
  );
};

export default DragAndDropTask;
