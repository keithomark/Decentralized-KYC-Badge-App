import React from 'react';
import { useCivicAuth } from '../hooks/useCivicAuth';
import { mintKycBadge } from '../utils/mintNft';
import { BadgeDisplay } from './BadgeDisplay';

export const MintButton = () => {
  const { wallet, isLoading: isWalletLoading } = useCivicAuth();
  const [isMinting, setIsMinting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [mintedBadge, setMintedBadge] = React.useState<{
    mintAddress: string;
    transactionId: string;
    metadataUrl: string;
    imageUrl: string;
  } | null>(null);

  const handleMint = async () => {
    if (!wallet) return;
    
    try {
      setIsMinting(true);
      setError(null);
      
      const result = await mintKycBadge(wallet);
      setMintedBadge({
        mintAddress: result.mintAddress,
        transactionId: result.transactionId,
        metadataUrl: result.metadataUrl,
        imageUrl: result.imageUrl,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint badge');
    } finally {
      setIsMinting(false);
    }
  };

  if (!wallet) return null;

  if (mintedBadge) {
    return <BadgeDisplay {...mintedBadge} />;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={handleMint}
        disabled={isMinting || isWalletLoading}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
      >
        {isMinting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Minting...
          </span>
        ) : (
          'Mint KYC Badge'
        )}
      </button>
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}; 