// backend/services/conductorService.js
const axios = require('axios');

const CONDUCTOR_URL = 'http://conductor-server:5000/api/metadata/'; // Update with your Conductor URL

exports.createWorkflow = async (name, tasks) => {
    const workflowDefinition = {
        name,
        tasks,
        // Add any other necessary workflow properties
    };
    const response = await axios.post(`${CONDUCTOR_URL}workflow`, workflowDefinition);
    return response.data;
};

exports.getWorkflows = async () => {
    const response = await axios.get(`${CONDUCTOR_URL}workflow`);
    return response.data;
};

// ... other Conductor-related methods
