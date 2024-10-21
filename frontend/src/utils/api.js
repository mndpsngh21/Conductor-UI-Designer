import axios from 'axios';

const API_URL = 'http://localhost:4000/api/'; // Adjust the URL as needed

// Fetch all workflows
export const getWorkflows = async () => {
    return await axios.get(`${API_URL}workflow/`);
};

// Create a new workflow
export const createWorkflow = async (workflow) => {
    return await axios.post(`${API_URL}workflow/`, workflow);
};

// Update an existing workflow
export const updateWorkflow = async (workflowId, workflow) => {
    return await axios.put(`${API_URL}workflow/${workflowId}`, workflow);
};

// Delete a workflow
export const deleteWorkflow = async (workflowId) => {
    return await axios.delete(`${API_URL}workflow/${workflowId}`);
};
