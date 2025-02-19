"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import wolfAnimation from "../public/wolf.json"; // Animation du loup

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [missionsUnlocked, setMissionsUnlocked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => {
        setMissionsUnlocked(true); // Débloque les missions après l'animation
      }, 2000); // Garde l'animation visible avant de passer aux missions
    }, 5000); // Garde le welcome et l'animation visibles pendant 5 secondes
  };

  return (
    <div className="container" onClick={handleClick}>
      {showWelcome ? (
        <motion.div
          className="welcome-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        >
          <Lottie animationData={wolfAnimation} className="wolf-animation" />
          <h1>Welcome to Joensuu!</h1>
          <p>Click to start your adventure...</p>
        </motion.div>
      ) : missionsUnlocked ? (
        <motion.div
          className="missions-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Select your mission:</h1>
          <div className="missions-container">
            <div className="mission" onClick={() => router.push("/tutorial")}>
              🏆 Tutorial (Start Here)
            </div>
            <div className="mission locked">🔒 Mission 1</div>
            <div className="mission locked">🔒 Mission 2</div>
            <div className="mission locked">🔒 Mission 3</div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Loading missions...</h1>
        </motion.div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #4facfe, #00f2fe);
          flex-direction: column;
        }
        .welcome-screen, .missions-screen {
          text-align: center;
          font-size: 36px;
          color: white;
          font-weight: bold;
        }
        .wolf-animation {
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
        }
        .missions-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        .mission {
          padding: 15px 30px;
          background: white;
          color: black;
          border-radius: 10px;
          cursor: pointer;
          font-size: 24px;
          transition: 0.3s;
        }
        .mission:hover {
          background: #ddd;
        }
        .locked {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
