import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Trending from "../components/Trending";
import MarketList from "../components/MarketList";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { category } = useParams(); // Lấy category từ URL

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Navbar />
        {/* Nếu có category, hiển thị MarketList, nếu không thì hiển thị Trending */}
        {category ? <MarketList /> : <Trending />}
        <MarketList />
      </div>
    </div>
  );
};

export default Dashboard;
