import React, { useState } from 'react';
import { useCivicAuth } from '@/hooks/useCivicAuth';
import LoginSection from '@/components/LoginSection';
import WalletSection from '@/components/WalletSection'; // To display wallet info
import { MintButton } from '@/components/MintButton';
import SuccessSection from '@/components/SuccessSection'; // To display after mint
import { SectionCard } from '@/components/ui/section-card'; // For consistent layout

// Define the structure of the minting result, matching MintButton and SuccessSection
interface MintResult {
  mintAddress: string;
  transactionId: string;
  metadataUrl: string;
  imageUrl: string;
}

const Index = () => {
  const { connected, walletAddress } = useCivicAuth();
  const [mintResult, setMintResult] = useState<MintResult | null>(null);

  const handleMintSuccess = (result: MintResult) => {
    setMintResult(result);
  };

  // Optional: Function to reset mint state if user wants to mint another (though typically one per session/identity)
  // const handleMintAnother = () => {
  //   setMintResult(null);
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Decentralized KYC Badge
          </h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Verify your identity securely with Civic and mint your unique KYC badge as an NFT on the Solana blockchain.
          </p>
        </header>
        
        <main className="max-w-lg mx-auto">
          {!connected ? (
            <LoginSection />
          ) : mintResult ? (
            <SuccessSection
              mintAddress={mintResult.mintAddress}
              walletAddress={walletAddress || ''} // walletAddress should be available if connected
              transactionId={mintResult.transactionId}
              metadataUrl={mintResult.metadataUrl}
              imageUrl={mintResult.imageUrl}
            />
            // Optionally, add a button here to "mint another" or go back
            // <Button onClick={handleMintAnother} className="mt-4">Mint Another (Dev)</Button>
          ) : (
            <>
              <WalletSection />
              {/*
                MintSection.tsx was a static display.
                MintButton.tsx is the interactive element.
                If MintSection is desired as a wrapper:
                <MintSection onMint={handleMintRequest} />
                Then MintSection would contain MintButton or similar logic.
                For now, directly using MintButton is simpler.
              */}
              <SectionCard title="Mint Your Badge" description="Once connected, you can mint your KYC badge." centered>
                <MintButton onMintSuccess={handleMintSuccess} />
              </SectionCard>
            </>
          )}
        </main>
        <footer className="text-center mt-12 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Civic KYC Badge Demo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
