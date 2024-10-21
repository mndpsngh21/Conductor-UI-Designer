// frontend/src/actions/taskActions.js
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = (prevTaskId) => ({
    type: "ADD_TASK",
    payload: { prevTaskId },
  });
  
export const updateTask = (taskId, updatedTask) => ({
    type: UPDATE_TASK,
    payload: { taskId, updatedTask },
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
});
