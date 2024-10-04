import React, { useEffect, useState, useRef } from 'react';
import * as joint from '@joint/core';
import { v4 as uuidv4 } from 'uuid';
import './RoadmapView.css';

function RoadmapView() {
  const paperContainer = useRef(null);
  const graph = useRef(null);
  const [roadmapData, setRoadmapData] = useState({ subjects: [] });
  const [newSubject, setNewSubject] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [file, setFile] = useState(null); // State for file upload

  useEffect(() => {
    graph.current = new joint.dia.Graph();
    const paper = new joint.dia.Paper({
      el: paperContainer.current,
      model: graph.current,
      width: 800,
      height: 600,
      gridSize: 1,
      interactive: { elementMove: false },
    });

    renderDiagram();
    calculateCompletionPercentage();

    return () => {
      graph.current.off('element:pointerdown');
    };
  }, []);

  const renderDiagram = () => {
    graph.current.clear();
    roadmapData.subjects.forEach((subject, subjectIndex) => {
      const subjectElement = new joint.shapes.standard.Rectangle();
      subjectElement.position(100 + subjectIndex * 200, 50);
      subjectElement.resize(150, 50);
      subjectElement.attr({
        body: { fill: 'url(#gradient-subject)', stroke: '#0056b3', strokeWidth: 2, rx: 15, ry: 15 }, // Rounded corners
        label: { text: subject.name, fill: 'white', fontSize: 14 },
      });

      subjectElement.addTo(graph.current);

      let currentY = 150;
      subject.topics.forEach((topic) => {
        const topicElement = new joint.shapes.standard.Rectangle();
        topicElement.position(100 + subjectIndex * 200, currentY);
        topicElement.resize(120, 40);
        topicElement.attr({
          body: { fill: topic.completed ? 'url(#gradient-completed)' : 'url(#gradient-incomplete)', stroke: '#0056b3', strokeWidth: 2, rx: 10, ry: 10 }, // Rounded corners
          label: { text: topic.name, fill: 'white', fontSize: 12 },
        });

        topicElement.addTo(graph.current);

        const link = new joint.shapes.standard.Link();
        link.source(subjectElement);
        link.target(topicElement);
        link.addTo(graph.current);
        link.attr({ line: { stroke: topic.completed ? '#28a745' : '#dc3545', strokeWidth: 3, targetMarker: { type: 'arrow', width: 10, height: 10 } } });
        link.set('router', { name: 'manhattan', args: { padding: 10 } });

        currentY += 60;
      });
    });
  };

  const calculateCompletionPercentage = () => {
    const completedTopics = roadmapData.subjects.reduce((total, subject) => {
      return total + subject.topics.filter(topic => topic.completed).length;
    }, 0);
    const totalTopics = roadmapData.subjects.reduce((total, subject) => {
      return total + subject.topics.length;
    }, 0);
    setCompletionPercentage((completedTopics / totalTopics) * 100 || 0);
  };

  const addSubject = () => {
    if (newSubject.trim() !== '') {
      const updatedRoadmapData = {
        ...roadmapData,
        subjects: [
          ...roadmapData.subjects,
          {
            id: uuidv4(),
            name: newSubject,
            topics: [],
          },
        ],
      };
      setRoadmapData(updatedRoadmapData);
      setNewSubject('');
    } else {
      alert('Please enter a subject name.');
    }
  };

  const deleteSubject = (subjectId) => {
    const updatedRoadmapData = {
      ...roadmapData,
      subjects: roadmapData.subjects.filter(subject => subject.id !== subjectId),
    };
    setRoadmapData(updatedRoadmapData);
    setSelectedSubjectId('');
  };

  const addTopic = () => {
    if (newTopic.trim() !== '' && selectedSubjectId) {
      const updatedRoadmapData = { ...roadmapData };
      const subjectToUpdate = updatedRoadmapData.subjects.find(
        (subject) => subject.id === selectedSubjectId
      );
      if (subjectToUpdate) {
        const topicId = uuidv4();
        subjectToUpdate.topics.push({
          id: topicId,
          name: newTopic,
          completed: false,
          attachments: [], // Initialize attachments array
        });
        setRoadmapData(updatedRoadmapData);
        setNewTopic('');
        renderDiagram();
      } else {
        alert('Subject not found.');
      }
    } else {
      alert('Please enter a topic name and select a subject.');
    }
  };

  const markAsCompleted = (topicId) => {
    const updatedRoadmapData = { ...roadmapData };
    updatedRoadmapData.subjects.forEach((subject) => {
      if (subject.id === selectedSubjectId) {
        const topicToUpdate = subject.topics.find((t) => t.id === topicId);
        if (topicToUpdate) {
          topicToUpdate.completed = !topicToUpdate.completed;
        }
      }
    });
    setRoadmapData(updatedRoadmapData);
    calculateCompletionPercentage();
  };

  const editTopic = (topicId) => {
    const updatedRoadmapData = { ...roadmapData };
    updatedRoadmapData.subjects.forEach((subject) => {
      if (subject.id === selectedSubjectId) {
        const topicToUpdate = subject.topics.find((t) => t.id === topicId);
        if (topicToUpdate) {
          const newName = prompt('Edit topic name:', topicToUpdate.name);
          if (newName && newName.trim() !== '') {
            topicToUpdate.name = newName.trim();
          }
        }
      }
    });
    setRoadmapData(updatedRoadmapData);
  };

  const deleteTopic = (topicId) => {
    const updatedRoadmapData = { ...roadmapData };
    updatedRoadmapData.subjects.forEach((subject) => {
      if (subject.id === selectedSubjectId) {
        subject.topics = subject.topics.filter((t) => t.id !== topicId);
      }
    });
    setRoadmapData(updatedRoadmapData);
    calculateCompletionPercentage();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (topicId) => {
    if (file) {
      const updatedRoadmapData = { ...roadmapData };
      updatedRoadmapData.subjects.forEach((subject) => {
        if (subject.id === selectedSubjectId) {
          const topicToUpdate = subject.topics.find((t) => t.id === topicId);
          if (topicToUpdate) {
            const newAttachment = {
              name: file.name,
              url: URL.createObjectURL(file), // Create a URL for the uploaded file
            };
            topicToUpdate.attachments.push(newAttachment); // Add attachment to the topic
          }
        }
      });
      setRoadmapData(updatedRoadmapData);
      setFile(null); // Reset the file input
    }
  };

  const removeAttachment = (topicId, index) => {
    const updatedRoadmapData = { ...roadmapData };
    updatedRoadmapData.subjects.forEach((subject) => {
      if (subject.id === selectedSubjectId) {
        const topicToUpdate = subject.topics.find((t) => t.id === topicId);
        if (topicToUpdate) {
          topicToUpdate.attachments.splice(index, 1); // Remove attachment
        }
      }
    });
    setRoadmapData(updatedRoadmapData);
  };

  useEffect(() => {
    if (graph.current) {
      renderDiagram();
    }
  }, [roadmapData]);

  return (
    <div className="roadmap-container">
      <div className="subject-container">
        <h3>Add New Subject</h3>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Subject Name"
        />
        <button className="button" onClick={addSubject}>Add Subject</button>
        <h3>Existing Subjects</h3>
        <ul>
          {roadmapData.subjects.map((subject) => (
            <li key={subject.id} className="subject-item">
              {subject.name}
              <button onClick={() => deleteSubject(subject.id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="topic-container">
        <h3>Add New Topic</h3>
        <select
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          value={selectedSubjectId}
        >
          <option value="">Select Subject</option>
          {roadmapData.subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Topic Name"
        />
        <button className="button" onClick={addTopic}>Add Topic</button>
      </div>

      <div ref={paperContainer} className="diagram-container" />

      <div className="manage-container">
        <h3>Manage Topics</h3>
        {selectedSubjectId && (
          <ul>
            {roadmapData.subjects.find((subject) => subject.id === selectedSubjectId)?.topics.map((topic) => (
              <li key={topic.id} className="topic-item">
                <span className={topic.completed ? 'completed' : ''}>
                  {topic.name}
                </span>
                <div className="topic-actions">
                  <button onClick={() => markAsCompleted(topic.id)} className="action-button">
                    Mark as {topic.completed ? 'Incomplete' : 'Completed'}
                  </button>
                  <button onClick={() => editTopic(topic.id)} className="edit-button">Edit</button>
                  <button onClick={() => deleteTopic(topic.id)} className="delete-button">Delete</button>
                </div>
                <div className="upload-section">
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={() => handleUpload(topic.id)} className="upload-button">Upload</button>
                  <div className="attachments">
                    {topic.attachments && topic.attachments.length > 0 && (
                      <ul>
                        {topic.attachments.map((attachment, index) => (
                          <li key={index} className="attachment-item">
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
                            <button onClick={() => removeAttachment(topic.id, index)} className="remove-button">Remove</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="completion-percentage">
        <h3>Completion Percentage: {completionPercentage.toFixed(2)}%</h3>
        <div className="completion-bar">
          <div className="completion-fill" style={{ width: `${completionPercentage}%` }} />
        </div>
      </div>

      {/* SVG for Gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient-subject" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#007bff', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#0056b3', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient-completed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#28a745', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1e7e34', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient-incomplete" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#dc3545', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#c82333', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default RoadmapView;