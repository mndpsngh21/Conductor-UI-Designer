const initialState = {
    tasks: [],
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        const newTask = {
          id: `task_${state.tasks.length + 1}`,
          name: 'New Task',
          type: 'SIMPLE',
          referenceName: `task_ref_${state.tasks.length + 1}`,
          inputParameters: {},
          nextTask: null,
        };
  
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.prevTaskId
              ? { ...task, nextTask: newTask.id }
              : task
          ).concat(newTask),
        };
  
      default:
        return state;
    }
  };
  
  export default taskReducer;
  