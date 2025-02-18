import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import '../styles/CreateMarket.css';

export function CreateMarket({ onCreate }) {
    const [marketData, setMarketData] = useState({
        name: "",
        description: "",
        category: "",
        options: ["", ""],
        endTime: "",
        validationSource: "",
        startingLiquidity: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [account, setAccount] = useState(null);
    const [walletBalance, setWalletBalance] = useState("0"); // Thêm trạng thái lưu số dư

    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error("Vui lòng cài đặt MetaMask!");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            await getWalletBalance(provider, address); // Lấy số dư sau khi kết nối ví
        } catch (err) {
            setError(err.message);
        }
    };

    const getWalletBalance = async (provider, address) => {
        try {
            const balance = await provider.getBalance(address);
            setWalletBalance(ethers.formatEther(balance)); // Chuyển từ Wei sang ETH hoặc BTB
        } catch (err) {
            setError("Không thể lấy số dư ví.");
        }
    };

    useEffect(() => {
        if (account) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          getWalletBalance(provider, account);
        }
      }, [account]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!marketData.name || !marketData.description || !marketData.category) {
                throw new Error("Vui lòng điền đầy đủ thông tin!");
            }
            if (marketData.options.some(opt => opt.trim() === "")) {
                throw new Error("Mỗi thị trường phải có ít nhất 2 lựa chọn!");
            }
            if (!marketData.validationSource) {
                throw new Error("Cần nhập nguồn xác thực!");
            }
            if (!marketData.startingLiquidity || isNaN(marketData.startingLiquidity)) {
                throw new Error("Số dư khởi tạo phải là số hợp lệ!");
            }

            await onCreate(marketData);
            setMarketData({
                name: "",
                description: "",
                category: "",
                options: ["", ""],
                endTime: "",
                validationSource: "",
                startingLiquidity: "",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-market-container">
            <div className="market-form-container">
                <h2 className="title">🚀 Tạo Thị Trường Dự Đoán</h2>
                {error && <div className="error-message">{error}</div>}

                <form className="market-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên thị trường</label>
                        <input type="text" placeholder="Nhập tên thị trường" value={marketData.name}
                            onChange={(e) => setMarketData({ ...marketData, name: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Mô tả</label>
                        <textarea placeholder="Mô tả thị trường..." value={marketData.description}
                            onChange={(e) => setMarketData({ ...marketData, description: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Danh mục</label>
                        <input type="text" placeholder="Danh mục (ví dụ: Crypto, NFT, AI)" value={marketData.category}
                            onChange={(e) => setMarketData({ ...marketData, category: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Thời gian kết thúc</label>
                        <input type="datetime-local" value={marketData.endTime}
                            onChange={(e) => setMarketData({ ...marketData, endTime: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>🔍 Nguồn xác thực</label>
                        <input type="text" placeholder="URL nguồn dữ liệu xác thực" value={marketData.validationSource}
                            onChange={(e) => setMarketData({ ...marketData, validationSource: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>💰 Số dư khởi tạo</label>
                        <input type="number" placeholder="Nhập số dư BTB" value={marketData.startingLiquidity}
                            onChange={(e) => setMarketData({ ...marketData, startingLiquidity: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Lựa chọn</label>
                        {marketData.options.map((option, index) => (
                            <input key={index} type="text" placeholder={`Lựa chọn ${index + 1}`} value={option}
                                onChange={(e) => {
                                    const newOptions = [...marketData.options];
                                    newOptions[index] = e.target.value;
                                    setMarketData({ ...marketData, options: newOptions });
                                }} required />
                        ))}
                        <button type="button" className="add-option-btn"
                            onClick={() => setMarketData({ ...marketData, options: [...marketData.options, ""] })}>
                            ➕ Thêm lựa chọn
                        </button>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "⏳ Đang tạo..." : "🚀 Tạo Thị Trường"}
                    </button>
                </form>
            </div>

            <div className="wallet-info">
                <h3>💳 Ví của bạn</h3>
                {account ? (
                    <p className="wallet-address">Đã kết nối</p>
                ) : (
                    <button className="connect-wallet-btn" onClick={connectWallet}>
                        🔗 Kết nối ví
                    </button>
                )}
                <p>Số dư: <strong>{walletBalance} BTB</strong></p>
            </div>
        </div>
    );
}

export default CreateMarket;
