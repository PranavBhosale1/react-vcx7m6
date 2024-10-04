// header.js file code
import React from 'react';
import './Header.css'; // We will create this file for header styling.

const Header = () => {
  return (
    <div className="header">
      {/* Website Name */}
      <div className="header-left">
        <h1>TrackIt</h1>
      </div>
      
      {/* Right Side of Header */}
      <div className="header-right">
        {/* Search Bar */}
        <input type="text" placeholder="Search..." className="search-bar" />
        
       

        {/* Get Started Button */}
        <button className="get-started-btn">Start</button>
        {/* Added Logout button here */}
        <button className="logout-btn">Logout</button>

      </div>
    </div>
  );
};

export default Header;
