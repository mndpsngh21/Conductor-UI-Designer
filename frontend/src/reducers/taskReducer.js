// frontend/src/reducers/taskReducer.js
import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../actions/taskActions';

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.taskId ? { ...task, ...action.payload.updatedTask } : task
                ),
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        default:
            return state;
    }
};

export default taskReducer;
