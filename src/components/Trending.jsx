import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Trending.css";  // Đảm bảo rằng đường dẫn đúng
import sportsImg from "../assets/sports.jpg";
import politicsImg from "../assets/politics.jpg";
import cryptoImg from "../assets/crypto.jpg";

const Trending = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/market/${category}`);
  };

  return (
    <div className="trending-container">
      <h2 className="trending-header">Trending Categories</h2>
      
      <div className="trending-cards">
        <div className="trending-card" onClick={() => handleCategoryClick("sports")}>
          <img src={sportsImg} alt="Sports" />
          <span className="trending-card-content">Sports</span>
        </div>
        <div className="trending-card" onClick={() => handleCategoryClick("politics")}>
          <img src={politicsImg} alt="Politics" />
          <span className="trending-card-content">Politics</span>
        </div>
        <div className="trending-card" onClick={() => handleCategoryClick("crypto")}>
          <img src={cryptoImg} alt="Crypto" />
          <span className="trending-card-content">Crypto</span>
        </div>
      </div>
    </div>
  );
};

export default Trending;
