import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useState } from "react";

function App() {
  const [walletAddress, setWalletAddress] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const createWallet = () => {
    const wallet = new Keypair();
    const publicKey = new PublicKey(wallet.publicKey);
    const privateKey = wallet.secretKey;
    console.log("privateKey:", privateKey);
    setWalletAddress(publicKey);
  };

  const getWalletBalance = async (walletAddress: PublicKey) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"));
      const walletBalance = await connection.getBalance(walletAddress);
      setBalance(walletBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const airDropWallet = async (walletAddress: PublicKey) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"));
      const fromAirDropSignature = await connection.requestAirdrop(
        walletAddress,
        2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
      alert("Completed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Solana Testt</h1>
      <div className="card">
        <button onClick={() => createWallet()}>Create Wallet</button>
        <p>{walletAddress?.toString()}</p>
      </div>
      {walletAddress && (
        <>
          <div className="card">
            <button onClick={() => getWalletBalance(walletAddress)}>
              Fetch balance
            </button>
            <p>{balance}</p>
          </div>
          <div className="card">
            <button onClick={() => airDropWallet(walletAddress)}>
              Airdrop
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
