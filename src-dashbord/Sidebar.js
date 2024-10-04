// sidebar.js (navigation bar) code 
import React from 'react';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#profile" onClick={() => setActiveSection('profile')}>My Profile</a></li>
        <li><a href="#roadmap" onClick={() => setActiveSection('roadmap')}>Roadmap Creation</a></li>
        <li><a href="#toc" onClick={() => setActiveSection('toc')}>Table of Content</a></li>
        <li><a href="#collaborate" onClick={() => setActiveSection('collaborate')}>Collaborate</a></li>
        <li><a href="#weekly" onClick={() => setActiveSection('weeklyGoals')}>Weekly Goals</a></li>
        <li><a href="#settings" onClick={() => setActiveSection('settings')}>Settings</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
