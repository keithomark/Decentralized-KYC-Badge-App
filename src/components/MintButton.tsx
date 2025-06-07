import React from 'react';
import { useCivicAuth } from '../hooks/useCivicAuth';
import { mintKycBadge } from '../utils/mintNft';
// BadgeDisplay import removed as it will be handled by Index.tsx (via SuccessSection)
import { useToast } from "@/hooks/use-toast";

// Define the structure of the minting result
interface MintResult {
  mintAddress: string;
  transactionId: string;
  metadataUrl: string;
  imageUrl: string;
}

interface MintButtonProps {
  onMintSuccess: (result: MintResult) => void;
}

export const MintButton: React.FC<MintButtonProps> = ({ onMintSuccess }) => {
  // Use pending and connected from useCivicAuth
  const { wallet, pending: isWalletPending, connected, walletAddress } = useCivicAuth();
  const { toast } = useToast(); // Initialize toast
  const [isMinting, setIsMinting] = React.useState(false);
  // No local mintedBadge state needed, will call prop
  // const [mintedBadge, setMintedBadge] = React.useState<MintResult | null>(null);

  const handleMint = async () => {
    if (!wallet || !connected) { // Ensure connected and wallet exists
      toast({ title: "Wallet not connected", description: "Please connect your wallet first.", variant: "destructive" });
      return;
    }
    
    try {
      setIsMinting(true);
      
      const result = await mintKycBadge(wallet); // result is already MintResult compatible
      onMintSuccess(result); // Call the callback prop with the result
      toast({ title: "Badge Minted!", description: "Your KYC badge has been successfully minted." });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to mint badge';
      toast({ title: "Minting Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsMinting(false);
    }
  };

  // Do not render the button if wallet is not connected yet or still pending
  // or if walletAddress is not available (which implies wallet is not fully ready)
  if (isWalletPending || !connected || !walletAddress) {
    return null;
  }

  // Removed: if (mintedBadge) { ... } - parent will handle display

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={handleMint}
        // Disable if wallet is pending, not connected, or minting is in progress
        disabled={isWalletPending || !connected || isMinting}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
      >
        {isMinting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"> {/* Using a simple SVG spinner */}
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
      {/* Error display below button is removed as toasts are used now */}
      {/* {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )} */}
    </div>
  );
}; 