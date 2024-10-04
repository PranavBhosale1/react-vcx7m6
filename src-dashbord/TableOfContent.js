/// TableOfContent.js
import React, { useState } from 'react';
import './TableOfContent.css';

const TableOfContent = () => {
  // State for holding the assignments, projects, and chapters with due dates
  const [assignments, setAssignments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  // State for input values
  const [assignmentInput, setAssignmentInput] = useState('');
  const [projectInput, setProjectInput] = useState('');
  const [chapterInput, setChapterInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState(''); // New state for due date

  // Handler functions to add items with due dates
  const addAssignment = () => {
    if (assignmentInput && dueDateInput) {
      setAssignments([...assignments, { title: assignmentInput, dueDate: dueDateInput }]);
      setAssignmentInput('');
      setDueDateInput(''); // Clear input after adding
    }
  };

  const addProject = () => {
    if (projectInput && dueDateInput) {
      setProjects([...projects, { title: projectInput, dueDate: dueDateInput }]);
      setProjectInput('');
      setDueDateInput(''); // Clear input after adding
    }
  };

  const addChapter = () => {
    if (chapterInput && dueDateInput) {
      setChapters([...chapters, { title: chapterInput, dueDate: dueDateInput }]);
      setChapterInput('');
      setDueDateInput(''); // Clear input after adding
    }
  };

  return (
    <div className="table-of-content">
      <h2>Table of Content</h2>
      <div className="toc-container">
        {/* Assignments Block */}
        <div className="toc-block">
          <h3>Assignments</h3>
          <input 
            type="text" 
            placeholder="Add Assignment" 
            value={assignmentInput} 
            onChange={(e) => setAssignmentInput(e.target.value)} 
          />
          <input 
            type="datetime-local" 
            value={dueDateInput} 
            onChange={(e) => setDueDateInput(e.target.value)} 
          />
          <button onClick={addAssignment}>Add Assignment</button>
          <ul>
            {assignments.map((assignment, index) => (
              <li key={index}>{assignment.title} - Due: {assignment.dueDate}</li>
            ))}
          </ul>
        </div>

        {/* Projects Block */}
        <div className="toc-block">
          <h3>Projects</h3>
          <input 
            type="text" 
            placeholder="Add Project" 
            value={projectInput} 
            onChange={(e) => setProjectInput(e.target.value)} 
          />
          <input 
            type="datetime-local" 
            value={dueDateInput} 
            onChange={(e) => setDueDateInput(e.target.value)} 
          />
          <button onClick={addProject}>Add Project</button>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>{project.title} - Due: {project.dueDate}</li>
            ))}
          </ul>
        </div>

        {/* Subject Chapters Block */}
        <div className="toc-block">
          <h3>Subject Chapters</h3>
          <input 
            type="text" 
            placeholder="Add Chapter" 
            value={chapterInput} 
            onChange={(e) => setChapterInput(e.target.value)} 
          />
          <input 
            type="datetime-local" 
            value={dueDateInput} 
            onChange={(e) => setDueDateInput(e.target.value)} 
          />
          <button onClick={addChapter}>Add Chapter</button>
          <ul>
            {chapters.map((chapter, index) => (
              <li key={index}>{chapter.title} - Due: {chapter.dueDate}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TableOfContent;