import React, { useState } from "react";
import { Camera, Wallet } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../styles/Profile.css";
import Avatar from "../assets/Avatar.jpg"; 

Chart.register(...registerables);

export default function Profile() {
  const [user] = useState({
    name: "John Doe",
    bio: "Crypto Betting Enthusiast | Blockchain Expert",
    avatar: Avatar,  // Sử dụng đường dẫn tương đối
    balance: "4.32 ETH",
    address: "0x70C2...bF58c",
    history: [
      { date: "2024-02-10", amount: "0.5 ETH", outcome: "Win" },
      { date: "2024-02-09", amount: "1.2 ETH", outcome: "Loss" },
      { date: "2024-02-08", amount: "0.8 ETH", outcome: "Win" },
    ],
  });

  const chartData = {
    labels: user.history.map((h) => h.date),
    datasets: [
      {
        label: "Betting History",
        data: user.history.map((h) => (h.outcome === "Win" ? 1 : -1)),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.2)",
      },
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img src={user.avatar} alt="Avatar" className="avatar" />
            <button className="camera-button">
              <Camera className="icon" />
            </button>
          </div>
          <div>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-bio">{user.bio}</p>
          </div>
        </div>

        {/* Wallet Information */}
        <div className="wallet-section">
          <div className="wallet-box">
            <h3>Wallet Balance</h3>
            <p className="wallet-value">{user.balance}</p>
            <Wallet className="wallet-icon" />
          </div>
          <div className="wallet-box">
            <h3>Wallet Address</h3>
            <p className="wallet-value">{user.address}</p>
          </div>
        </div>

        {/* Betting History */}
        <div className="history-section">
          <h3>Betting History</h3>
          <Line key={JSON.stringify(user.history)} data={chartData} />
        </div>
      </div>
    </div>
  );
}
