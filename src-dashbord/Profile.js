// Profile.js
import React from 'react';
import './Profile.css'; // Create this file for profile styling.

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="summary-section">
        <h2>Roadmap Summary</h2>
        {/* Add your Roadmap Summary Component here */}
        <div className="roadmap-summary">[Roadmap Summary Component]</div>

        <h2>Progress Overview</h2>
        {/* Add your Progress Overview Component here */}
        <div className="progress-overview">[Progress Overview Component]</div>

        <h2>Shared Roadmaps</h2>
        {/* Add your Shared Roadmaps Component here */}
        <div className="shared-roadmaps">[Shared Roadmaps Component]</div>

        <h2>Linked Resources</h2>
        {/* Add your Linked Resources Component here */}
        <div className="linked-resources">[Linked Resources Component]</div>
      </div>

      <div className="profile-content">
        <h2>User Profile</h2>
        <p><strong>Name:</strong> [User Name]</p>
        <p><strong>Email:</strong> [User Email]</p>
        <p><strong>Bio:</strong> [User Bio]</p>
      </div>
    </div>
  );
};

export default Profile;
