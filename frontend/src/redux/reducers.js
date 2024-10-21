import { ADD_WORKFLOW, SET_WORKFLOWS } from './actions';

const initialState = {
    workflows: [],
};

const workflowReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKFLOW:
            return {
                ...state,
                workflows: [...state.workflows, action.payload],
            };
        case SET_WORKFLOWS:
            return {
                ...state,
                workflows: action.payload,
            };
        default:
            return state;
    }
};

export default workflowReducer;
