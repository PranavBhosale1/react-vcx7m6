import React, { useState } from 'react';
import './WeeklyGoals.css'; // Add a separate CSS file for styling

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyGoals = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask && selectedDay) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [selectedDay]: [...(prevTasks[selectedDay] || []), newTask],
      }));
      setNewTask(''); // Reset task input
    }
  };

  return (
    <div className="weekly-goals">
      <h2>Weekly Goals</h2>
      <div className="days">
        {daysOfWeek.map(day => (
          <div key={day} className="day-container">
            <button
              className={`day-button ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
            {selectedDay === day && (
              <div className="task-input">
                <input
                  type="text"
                  value={newTask}
                  placeholder="Enter a task"
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
              </div>
            )}
            <ul className="task-list">
              {tasks[day] ? tasks[day].map((task, index) => (
                <li key={index}>{task}</li>
              )) : <li>No tasks for this day.</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGoals;

