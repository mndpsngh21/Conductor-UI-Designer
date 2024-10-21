import React from 'react';

const WorkflowList = ({ workflows, onSelect, onCreate }) => {
    return (
        <div>
            <h2>Existing Workflows</h2>
            <ul>
                {workflows.map(workflow => (
                    <li key={workflow.id} onClick={() => onSelect(workflow)}>
                        {workflow.name}
                    </li>
                ))}
            </ul>
            <button onClick={() => onCreate({ name: 'New Workflow', tasks: [] })}>
                Create New Workflow
            </button>
        </div>
    );
};

export default WorkflowList;
