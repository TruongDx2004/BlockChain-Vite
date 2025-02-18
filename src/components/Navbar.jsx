import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../styles/Navbar.css"; // Đường dẫn đến file CSS

const Navbar = () => {
  const [account, setAccount] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("⚠️ Vui lòng cài đặt MetaMask trước!\n🔗 https://metamask.io/download/");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
    } catch (error) {
      console.error("Lỗi kết nối MetaMask:", error);
      alert("❌ Lỗi khi kết nối ví. Hãy thử lại!");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <input type="text" placeholder="Search for any market..." className="search-bar" />
      <div className="nav-buttons">
        <button className="buy-btn">BUY STB</button>
        <button
          className={`wallet-btn ${account ? "connected" : ""}`}
          onClick={connectWallet}
        >
          {account ? "Connected" : "CONNECT WALLET"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
