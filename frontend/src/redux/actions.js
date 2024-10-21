export const ADD_WORKFLOW = 'ADD_WORKFLOW';
export const SET_WORKFLOWS = 'SET_WORKFLOWS';

export const addWorkflow = (workflow) => ({
    type: ADD_WORKFLOW,
    payload: workflow,
});

export const setWorkflows = (workflows) => ({
    type: SET_WORKFLOWS,
    payload: workflows,
});
