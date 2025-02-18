import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types"; 

const DefaultLayout  = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired, 
  };

export default DefaultLayout;
