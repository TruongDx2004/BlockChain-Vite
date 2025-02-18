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
        privacy: "public", // Default to 'public'
        groupId: "", // Group ID state for private market
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [account, setAccount] = useState(null);
    const [walletBalance, setWalletBalance] = useState("0");
    const [walletId, setWalletId] = useState(""); // Wallet ID state

    const connectWallet = async () => {
        try {
            if (!window.ethereum) throw new Error("Please install MetaMask!");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            setWalletId(address); // Set wallet ID after connection
            await getWalletBalance(provider, address);
        } catch (err) {
            setError(err.message);
        }
    };

    const getWalletBalance = async (provider, address) => {
        try {
            const balance = await provider.getBalance(address);
            setWalletBalance(ethers.formatEther(balance));
        } catch (err) {
            setError("Unable to fetch wallet balance.");
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

        // Check if wallet is connected before proceeding
        if (!walletId) {
            showWalletAlert(); // Show wallet connection alert
            setLoading(false); // Reset loading
            return;
        }

        try {
            if (!marketData.name || !marketData.description || !marketData.category) {
                throw new Error("Please fill in all required fields!");
            }
            if (marketData.options.some(opt => opt.trim() === "")) {
                throw new Error("Each market must have at least 2 options!");
            }
            if (!marketData.validationSource) {
                throw new Error("Please provide the validation source!");
            }
            if (!marketData.startingLiquidity || isNaN(marketData.startingLiquidity)) {
                throw new Error("Starting liquidity must be a valid number!");
            }

             // Send data to API, including wallet ID
             const response = await fetch('http://localhost:3001/api/create-market', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...marketData, walletId }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Market created', data);
                setMarketData({
                    name: "",
                    description: "",
                    category: "",
                    options: ["", ""],
                    endTime: "",
                    validationSource: "",
                    startingLiquidity: "",
                    privacy: "public", // Reset privacy to default
                    groupId: "",
                });
                alert(data.message); // Show success message
            } else {
                throw new Error(data.message || 'Something went wrong!');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Show alert if wallet is not connected
    const showWalletAlert = () => {
        alert("⚠️ You need to connect your wallet before creating a market!");
    };

    return (
        <div className="create-market-container">
            <div className="market-form-container">
                <h2 className="title">🚀 Create Prediction Market</h2>
                {error && <div className="error-message">{error}</div>}

                

                <form className="market-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Market Name</label>
                        <input type="text" placeholder="Enter market name" value={marketData.name}
                            onChange={(e) => setMarketData({ ...marketData, name: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Market description..." value={marketData.description}
                            onChange={(e) => setMarketData({ ...marketData, description: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" placeholder="Category (e.g. Crypto, NFT, AI)" value={marketData.category}
                            onChange={(e) => setMarketData({ ...marketData, category: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>End Time</label>
                        <input type="datetime-local" value={marketData.endTime}
                            onChange={(e) => setMarketData({ ...marketData, endTime: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>🔍 Validation Source</label>
                        <input type="text" placeholder="Validation source URL" value={marketData.validationSource}
                            onChange={(e) => setMarketData({ ...marketData, validationSource: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>💰 Starting Liquidity</label>
                        <input type="number" placeholder="Enter starting BTB balance" value={marketData.startingLiquidity}
                            onChange={(e) => setMarketData({ ...marketData, startingLiquidity: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label>Options</label>
                        {marketData.options.map((option, index) => (
                            <input key={index} type="text" placeholder={`Option ${index + 1}`} value={option}
                                onChange={(e) => {
                                    const newOptions = [...marketData.options];
                                    newOptions[index] = e.target.value;
                                    setMarketData({ ...marketData, options: newOptions });
                                }} required />
                        ))}
                        <button type="button" className="add-option-btn"
                            onClick={() => setMarketData({ ...marketData, options: [...marketData.options, ""] })}>
                            ➕ Add Option
                        </button>
                    </div>

                    {/* Public or Private Selection */}
                    <div className="form-group">
                        <label>Privacy</label>
                        <div>
                            <label>
                                <input type="radio" value="public" checked={marketData.privacy === "public"}
                                    onChange={() => setMarketData({ ...marketData, privacy: "public" })} />
                                Public
                            </label>
                            <label>
                                <input type="radio" value="private" checked={marketData.privacy === "private"}
                                    onChange={() => setMarketData({ ...marketData, privacy: "private" })} />
                                Private
                            </label>
                        </div>
                    </div>

                    {/* If Private, require Group ID */}
                    {marketData.privacy === "private" && (
                        <div className="form-group">
                            <label>Group ID</label>
                            <input type="text" placeholder="Enter group ID" value={marketData.groupId}
                                onChange={(e) => setMarketData({ ...marketData, groupId: e.target.value })} required />
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading || !walletId}>
                        {loading ? "⏳ Creating..." : "🚀 Create Market"}
                    </button>
                </form>
            </div>

            <div className="wallet-info">
                <h3>💳 Your Wallet</h3>
                {account ? (
                    <p className="wallet-address">Connected</p>
                ) : (
                    <button className="connect-wallet-btn" onClick={connectWallet}>
                        🔗 Connect Wallet
                    </button>
                )}
                <p>Balance: <strong>{walletBalance} BTB</strong></p>
                {/* Check if wallet is connected and if walletId is set */}
                {!walletId && (
                    <div className="error-message">⚠️ You need to connect your wallet to create a market!</div>
                )}
            </div>
        </div>
    );
}

export default CreateMarket;
