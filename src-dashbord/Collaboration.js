// Collaboration.js
import React, { useState } from 'react';
import './Collaboration.css'; // You'll create this file for custom styles

const Collaboration = () => {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [discussion, setDiscussion] = useState('');
  const [forumPosts, setForumPosts] = useState([]);

  // Function to handle email sending
  const sendNote = () => {
    if (email && note) {
      alert(`Note sent to ${email}!`);
      setEmail('');
      setNote('');
    }
  };

  // Function to add a discussion post
  const addPost = () => {
    if (discussion) {
      setForumPosts([...forumPosts, discussion]);
      setDiscussion('');
    }
  };

  return (
    <div className="collaboration">
      <h2>Collaboration Hub</h2>

      {/* Note Sharing Section */}
      <div className="note-sharing">
        <h3>Share Notes via Email</h3>
        <input 
          type="email" 
          placeholder="Enter recipient email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <textarea 
          placeholder="Enter your note..." 
          value={note}
          onChange={(e) => setNote(e.target.value)} 
        />
        <button onClick={sendNote}>Send Note</button>
      </div>

      {/* Discussion Forum Section */}
      <div className="discussion-forum">
        <h3>Discussion Forum</h3>
        <textarea 
          placeholder="Start a discussion..." 
          value={discussion}
          onChange={(e) => setDiscussion(e.target.value)} 
        />
        <button onClick={addPost}>Post</button>
        
        <div className="forum-posts">
          {forumPosts.map((post, index) => (
            <div key={index} className="post">
              <p>{post}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
