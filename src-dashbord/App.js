import React, { useState } from "react";
import "./App.css"; // Your global styles
import Sidebar from './Sidebar'; // Sidebar component
import Header from "./Header"; // Header component
import TableOfContent from './TableOfContent'; // Table of Contents component
import WeeklyGoals from './WeeklyGoals'; // Weekly Goals component
import RoadmapBoard from "./RoadmapBoard"; // Roadmap/TaskBoard component
import Profile from './Profile'; // Profile component
import Collaboration from './Collaboration'; // Collaboration component
import LoginPage from "./LoginPage"; // Replace Login and Signup with LoginPage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Logged-in state
  const [activeSection, setActiveSection] = useState('roadmap'); // Default active section

  // Handle user login
  const handleLogin = () => {
    setIsLoggedIn(true); // Log the user in and show main page
  };

  // Render the correct section based on activeSection
  const renderSection = () => {
    if (!isLoggedIn) return null; // Render nothing if not logged in

    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'roadmap':
        return <RoadmapBoard />;
      case 'toc':
        return <TableOfContent />;
      case 'collaborate':
        return <Collaboration />;
      case 'weeklyGoals':
        return <WeeklyGoals />;
      case 'settings':
        return <div>Settings Section</div>;
      default:
        return <RoadmapBoard />;
    }
  };

  return (
    <div className="App">
      {/* If user is logged in */}
      {isLoggedIn ? (
        <>
          <Header /> {/* Header for all pages */}
          <div className="main-container">
            <Sidebar setActiveSection={setActiveSection} /> {/* Sidebar */}
            <div className="main-content">
              {renderSection()} {/* Display active section */}
            </div>
          </div>
        </>
      ) : (
        // If user is not logged in, show LoginPage
        <LoginPage handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
