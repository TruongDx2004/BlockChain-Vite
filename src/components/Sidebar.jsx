import React from "react";
import { FaBars, FaTimes, FaHome, FaChartLine, FaCheck, FaPaintBrush, FaUser, FaTrophy, FaFileAlt, FaCog, FaBell, FaPlus } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Header Sidebar */}
      <div className="sidebar-header">
        <h2 className="logo">{isOpen ? "CODE BREW" : "CB"}</h2>
        <button className="menu-toggle" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <a href="/dashboard">
          <FaHome className="icon" /> <span>Dashboard</span>
        </a>
        <a href="/create-market" className="create-market">
          <FaPlus className="icon" /> <span>Create Market</span>
        </a>
        <a href="/profile">
          <FaUser className="icon" /> <span>Profile</span>
        </a>
        <a href="/leaderboard">
          <FaTrophy className="icon" /> <span>Leaderboard</span>
        </a>
        <a href="/notifications">
          <FaBell className="icon" />
          <span>Notifications</span>
          <span className="badge">3</span>
        </a>
        
      </nav>
    </div>
  );
};

export default Sidebar;
