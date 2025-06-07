import { Button } from "@/components/ui/button";
import { Badge, ExternalLink } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { shortenAddress, outlineButtonStyles } from "@/utils/common";

interface SuccessSectionProps {
  nftAddress: string;
  walletAddress: string;
}

const SuccessSection = ({ nftAddress, walletAddress }: SuccessSectionProps) => {
  const openSolanaExplorer = () => {
    window.open(`https://explorer.solana.com/address/${nftAddress}`, '_blank');
  };

  return (
    <SectionCard
      title="🎉 Badge Minted!"
      description="You now own a Civic KYC Badge NFT."
      centered
    >
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-web3-primary to-web3-secondary rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
          <Badge className="h-8 w-8 text-white" />
        </div>
        <div className="p-4 bg-muted rounded-lg border border-web3-border space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">NFT Address</p>
            <p className="font-mono text-sm">{shortenAddress(nftAddress, 8, 6)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-sm">{shortenAddress(walletAddress, 8, 6)}</p>
          </div>
        </div>
        <Button
          onClick={openSolanaExplorer}
          variant="outline"
          className={outlineButtonStyles}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Solana Explorer
        </Button>
      </div>
    </SectionCard>
  );
};

export default SuccessSection;
