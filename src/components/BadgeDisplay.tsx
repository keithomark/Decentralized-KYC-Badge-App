import React from 'react';

interface BadgeDisplayProps {
  mintAddress: string;
  transactionId: string;
  metadataUrl: string;
  imageUrl: string;
  isLoading?: boolean;
  walletAddress?: string | null; // Add walletAddress prop
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  mintAddress,
  transactionId,
  metadataUrl,
  imageUrl,
  isLoading = false,
  walletAddress, // Destructure walletAddress
}) => {
  const explorerUrl = `https://explorer.solana.com/tx/${transactionId}?cluster=devnet`;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
        <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
      <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt="KYC Badge"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I4MmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTkgMTJsMiAyIDQtNE0yMSAxMmE5IDkgMCAxMS0xOCAwIDkgOSAwIDAxMTggMHoiLz48L3N2Zz4=';
          }}
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">KYC Badge Minted!</h3>
        <p className="text-sm text-gray-600 mt-1">Your identity is now verified on-chain</p>
      </div>

      <div className="w-full space-y-3">
        {walletAddress && ( // Display Wallet Address if available
          <div className="text-sm">
            <span className="font-medium text-gray-700">Wallet Address:</span>
            <p className="text-gray-600 break-all">{walletAddress}</p>
          </div>
        )}
        <div className="text-sm">
          <span className="font-medium text-gray-700">Mint Address:</span>
          <p className="text-gray-600 break-all">{mintAddress}</p>
        </div>

        <div className="text-sm">
          <span className="font-medium text-gray-700">Metadata:</span>
          <a
            href={metadataUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 hover:text-blue-600 break-all"
          >
            {metadataUrl}
          </a>
        </div>
        
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-blue-500 hover:text-blue-600"
        >
          View on Solana Explorer →
        </a>
      </div>
    </div>
  );
}; 