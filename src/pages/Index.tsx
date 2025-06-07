import React from 'react';
import { WalletInfo } from '../components/WalletInfo';
import { MintButton } from '../components/MintButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Decentralized KYC Badge</h1>
          <p className="text-gray-600 mt-2">Verify your identity and get your KYC badge NFT</p>
        </header>
        
        <main className="max-w-md mx-auto bg-white rounded-lg shadow-md">
          <WalletInfo />
          <MintButton />
        </main>
      </div>
    </div>
  );
};

export default Index;
