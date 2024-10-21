// backend/controllers/workflowController.js
const ConductorService = require('../services/conductorService');

// Create a new workflow
exports.createWorkflow = async (req, res) => {
    const { name, tasks } = req.body;
    try {
        const workflow = await ConductorService.createWorkflow(name, tasks);
        res.status(201).json(workflow);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all workflows
exports.getWorkflows = async (req, res) => {
    try {
        console.log("Fetching workflows...");
        const workflows = await ConductorService.getWorkflows();
        res.status(200).json(workflows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... other workflow-related endpoints
