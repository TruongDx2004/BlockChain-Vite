import React from "react";
import { useParams } from "react-router-dom";
import MarketCard from "./MarketCard";
import "../styles/MarketList.css";

const marketData = {
  sports: [
    {
      category: "Sports",
      hashtags: ["PremierLeague", "Arsenal", "Tottenham"],
      question: "EPL: Will Arsenal beat Tottenham Hotspur on January 15, 2025 UTC?",
      time: "02D : 11H : 47M : 4S",
      yesPercent: 83,
      noPercent: 17
    },
    {
      category: "Sports",
      hashtags: ["NFL", "Rams", "Vikings"],
      question: "NFL: Will the Vikings beat the Rams on January 14, 2025 UTC?",
      time: "16H : 47M : 4S",
      yesPercent: 50,
      noPercent: 50
    }
  ],
  politics: [
    {
      category: "Politics",
      hashtags: ["Election", "USA"],
      question: "Will the next US president be a Democrat?",
      time: "30D : 05H : 20M : 10S",
      yesPercent: 60,
      noPercent: 40
    }
  ],
  crypto: [
    {
      category: "Crypto",
      hashtags: ["Bitcoin", "Ethereum"],
      question: "Will Bitcoin reach $100K by the end of 2025?",
      time: "300D : 12H : 30M : 15S",
      yesPercent: 45,
      noPercent: 55
    }
  ]
};

const MarketList = () => {
  const { category } = useParams();

  return (
    <div className="market-list">
      {category ? (
        // Nếu có category, chỉ hiển thị danh mục đó
        <>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Markets</h2>
          <div className="market-container">
            {marketData[category] ? (
              marketData[category].map((item, index) => <MarketCard key={index} {...item} />)
            ) : (
              <p>No markets available for this category.</p>
            )}
          </div>
        </>
      ) : (
        // Nếu không có category, hiển thị tất cả danh mục theo hàng
        Object.entries(marketData).map(([key, data]) => (
          <div key={key} className="market-category">
            <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
            <div className="market-container">
              {data.map((item, index) => (
                <MarketCard key={index} {...item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MarketList;
