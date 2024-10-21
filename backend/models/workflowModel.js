// backend/models/workflowModel.js
const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: Object, required: true }],
    createdAt: { type: Date, default: Date.now },
});

const Workflow = mongoose.model('Workflow', workflowSchema);
module.exports = Workflow;
