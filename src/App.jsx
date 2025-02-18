import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MarketList from "./pages/Market";
import Profile from "./pages/Profile"; 
import CreateMarketPage from "./pages/CreateMarket";  


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Mặc định hiển thị Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Điều hướng đến MarketList khi chọn một danh mục */}
          <Route path="/market/:category" element={<MarketList />} />

          {/* Điều hướng đến trang tạo Market */}
          <Route path="/create-market" element={<CreateMarketPage />} />

          {/* Điều hướng đến trang Profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
