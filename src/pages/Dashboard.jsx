import React from "react";
import { useParams } from "react-router-dom";
import Trending from "../components/Trending";
import MarketList from "../components/MarketList";
import DefaultLayout from "../layouts/Defaultlayout";


const Dashboard = () => {
  const { category } = useParams(); // Lấy category từ URL

  return (
    <DefaultLayout>
      {/* Nếu có category, hiển thị MarketList, nếu không thì hiển thị Trending */}
      {category ? <MarketList /> : <Trending />}
      <MarketList />
    </DefaultLayout>
  );
};

export default Dashboard;
