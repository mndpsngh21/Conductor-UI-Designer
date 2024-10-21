import React, { useState, useEffect } from 'react';

const WorkflowEditor = ({ workflow, onSave }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (workflow) {
            setName(workflow.name);
        }
    }, [workflow]);

    const handleSubmit = () => {
        const updatedWorkflow = { ...workflow, name };
        onSave(updatedWorkflow);
    };

    if (!workflow) {
        return <div>Select a workflow to edit</div>;
    }

    return (
        <div>
            <h2>Edit Workflow</h2>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <button onClick={handleSubmit}>Save</button>
        </div>
    );
};

export default WorkflowEditor;
