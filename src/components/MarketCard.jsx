import React from "react";
import "../styles/MarketList.css";

const MarketCard = ({ category, hashtags, question, time, yesPercent, noPercent }) => {
  return (
    <div className="market-card">
      <span className="category">{category}</span>
      <div className="hashtags">{hashtags.map(tag => `#${tag} `)}</div>
      <h3 className="question">{question}</h3>
      <div className="time">{time}</div>
      <div className="buttons">
        <button className="yes-button">YES {yesPercent}%</button>
        <button className="no-button">NO {noPercent}%</button>
      </div>
    </div>
  );
};

export default MarketCard;
