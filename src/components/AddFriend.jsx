import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddFriend.css";

export default function AddFriend() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a wallet address or name.");
      return;
    }
    setError("");
    alert(`Searching for: ${input}`);
    // Thực hiện tìm kiếm và điều hướng đến trang profile với kết quả tìm kiếm
    navigate(`/profile?search=${encodeURIComponent(input)}`);
  };

  return (
    <div className="add-friend-container">
      <h2>Add Friend</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Wallet Address or Name"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(""); // Xóa thông báo lỗi khi người dùng nhập liệu
          }}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Search</button>
      </form>
      <button className="back-button" onClick={() => navigate("/profile")}>
        Back
      </button>
    </div>
  );
}