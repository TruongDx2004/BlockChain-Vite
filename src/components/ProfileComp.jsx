import React, { useState } from "react";
import { Camera, Wallet, Users, UserPlus, PlusSquare } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "../styles/Profile.css";
import Avatar from "../assets/Avatar.jpg";
import { useNavigate } from "react-router-dom"; // Import điều hướng


Chart.register(...registerables);

export default function Profile() {
  const navigate = useNavigate(); // Hook điều hướng
  
  const [user] = useState({
    name: "John Doe",
    bio: "Crypto Betting Enthusiast | Blockchain Expert",
    avatar: Avatar,
    balance: "4.32 ETH",
    address: "0x70C2...bF58c",
    history: [
      { date: "2024-02-10", amount: "0.5 ETH", outcome: "Win" },
      { date: "2024-02-09", amount: "1.2 ETH", outcome: "Loss" },
      { date: "2024-02-08", amount: "0.8 ETH", outcome: "Win" },
    ],
  });

  const [friends, setFriends] = useState([
    { id: 1, name: "Alice", avatar: Avatar },
    { id: 2, name: "Bob", avatar: Avatar },
    { id: 1, name: "Alice", avatar: Avatar },
    { id: 2, name: "Bob", avatar: Avatar },
    { id: 1, name: "Alice", avatar: Avatar },
    { id: 2, name: "Bob", avatar: Avatar },
    { id: 1, name: "Alice", avatar: Avatar },
    { id: 2, name: "Bob", avatar: Avatar },
    { id: 1, name: "Alice", avatar: Avatar },
    { id: 2, name: "Bob", avatar: Avatar },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: "Crypto Kings" },
    { id: 2, name: "Betting Masters" },
  ]);

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
          <Line key={JSON.stringify(user.history)} data={{
            labels: user.history.map((h) => h.date),
            datasets: [
              {
                label: "Betting History",
                data: user.history.map((h) => (h.outcome === "Win" ? 1 : -1)),
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56, 189, 248, 0.2)",
              },
            ],
          }} />
        </div>
      </div>

      {/* Friends & Groups Section */}
      <div className="friends-groups">
        {/* Friends List */}
        <div className="friends-list">
          <div className="friends-header">
            <h3>Friends</h3>
            <button className="add-button"  onClick={() => navigate("/add-friend")}>
              <UserPlus className="icon" /> Add Friend
            </button>
          </div>
          <div>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id} className="friend-item">
                <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                <span>{friend.name}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>

        {/* Groups List */}
        <div className="groups-list">
          <div className="groups-header">
            <h3>Groups</h3>
            <button className="add-button" onClick={() => navigate("/add-group")}>
              <PlusSquare className="icon" /> Create Group
            </button>
          </div>
          <div>
          <ul>
            {groups.map((group) => (
              <li key={group.id} className="group-item">
                <Users className="group-icon" />
                <span>{group.name}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
