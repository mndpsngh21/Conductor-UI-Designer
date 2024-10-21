// TaskPopup.js
import React, { useState } from 'react';

const TaskPopup = ({ tasks, onTaskSelect, closeModal }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.type === activeTab || activeTab === 'All'
  ).filter(task =>
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h3>ADD TASK</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Filter tasks"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="tab-navigation">
        <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
        <button className={activeTab === 'System' ? 'active' : ''} onClick={() => setActiveTab('System')}>System</button>
        <button className={activeTab === 'Operators' ? 'active' : ''} onClick={() => setActiveTab('Operators')}>Operators</button>
        <button className={activeTab === 'AIAgent' ? 'active' : ''} onClick={() => setActiveTab('AIAgent')}>AI Agent</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} onClick={() => onTaskSelect(task)}>
            <span className="task-icon">{task.icon}</span>
            <div className="task-details">
              <span className="task-title">{task.name}</span>
              <span className="task-description">{task.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPopup;
