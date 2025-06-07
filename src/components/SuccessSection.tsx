import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react"; // Badge import removed, ExternalLink kept
import { SectionCard } from "@/components/ui/section-card";
import { shortenAddress, outlineButtonStyles } from "@/utils/common";

interface SuccessSectionProps {
  mintAddress: string; // Renamed from nftAddress for clarity
  walletAddress: string;
  transactionId: string;
  metadataUrl: string;
  imageUrl: string;
}

const SuccessSection = ({
  mintAddress,
  walletAddress,
  transactionId,
  metadataUrl,
  imageUrl
}: SuccessSectionProps) => {
  const explorerTxUrl = `https://explorer.solana.com/tx/${transactionId}?cluster=devnet`;
  // const explorerAddressUrl = `https://explorer.solana.com/address/${mintAddress}?cluster=devnet`; // Link to mint address if needed

  return (
    <SectionCard
      title="🎉 Badge Minted!"
      description="You now own a Civic KYC Badge NFT."
      centered
    >
      <div className="space-y-4 items-center flex flex-col"> {/* Added flex for centering image */}
        {imageUrl ? (
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden my-4">
            <img
              src={imageUrl}
              alt="Minted Badge"
              className="w-full h-full object-cover"
              onError={(e) => { // Fallback for broken image
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM2I4MmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTkgMTJsMiAyIDQtNE0yMSAxMmE5IDkgMCAxMS0xOCAwIDkgOSAwIDAxMTggMHoiLz48L3N2Zz4=';
                target.alt = 'Fallback Badge Image';
              }}
            />
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center my-4 text-gray-500">
            No Image
          </div>
        )}
        <div className="p-4 bg-muted rounded-lg border border-web3-border space-y-2 w-full max-w-md">
          <div>
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-sm break-all">{shortenAddress(walletAddress)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">NFT Mint Address</p>
            <p className="font-mono text-sm break-all">{shortenAddress(mintAddress)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Metadata URL</p>
            <a href={metadataUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-blue-500 hover:text-blue-600 break-all">
              View Metadata
            </a>
          </div>
        </div>
        <Button
          onClick={() => window.open(explorerTxUrl, '_blank')}
          variant="outline"
          className={outlineButtonStyles}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Transaction on Solana Explorer
        </Button>
      </div>
    </SectionCard>
  );
};

export default SuccessSection;
