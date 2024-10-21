// backend/routes/workflowRoutes.js
const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

// Define workflow routes
router.post('/workflow', workflowController.createWorkflow);
router.get('/workflow', workflowController.getWorkflows);
// ... other workflow routes

module.exports = router;
