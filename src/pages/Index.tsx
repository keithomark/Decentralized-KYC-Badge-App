
import { useState } from "react";
import Header from "@/components/Header";
import LoginSection from "@/components/LoginSection";
import WalletSection from "@/components/WalletSection";
import MintSection from "@/components/MintSection";
import SuccessSection from "@/components/SuccessSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBadgeMinted, setIsBadgeMinted] = useState(false);
  const [walletAddress] = useState("9sYgH3bQ2xNmK8Pr4bWvF7zL9PoLZ3xM1");
  const [nftAddress] = useState("ABC123def456GHI789jkl012MNO345pqr678");

  const handleLogin = () => {
    console.log("Logging in with Civic...");
    setIsLoggedIn(true);
  };

  const handleMint = () => {
    console.log("Minting badge...");
    setIsBadgeMinted(true);
  };

  return (
    <div className="min-h-screen bg-background dark flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {!isLoggedIn && (
            <div className="text-center space-y-6">
              <LoginSection onLogin={handleLogin} />
            </div>
          )}

          {isLoggedIn && (
            <div className="space-y-6">
              <WalletSection walletAddress={walletAddress} />
              
              {!isBadgeMinted ? (
                <MintSection onMint={handleMint} />
              ) : (
                <SuccessSection 
                  nftAddress={nftAddress} 
                  walletAddress={walletAddress} 
                />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
