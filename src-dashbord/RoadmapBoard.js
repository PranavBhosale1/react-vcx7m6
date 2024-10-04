import React, { useState } from 'react';
import './RoadmapBoard.css';

const RoadmapBoard = () => {
  const [roadmap, setRoadmap] = useState([]);
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task) {
      setRoadmap([...roadmap, task]);
      setTask('');
    }
  };

  return (
    <div className="roadmap-creation">
      <h2>Create Your Roadmap</h2>
      <div className="roadmap-form">
        <div className="form-group">
          <label htmlFor="task">Enter Task:</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="roadmap">
        <h3>Roadmap</h3>
        <ul>
          {roadmap.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoadmapBoard;

