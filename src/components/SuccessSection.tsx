
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, ExternalLink } from "lucide-react";

interface SuccessSectionProps {
  nftAddress: string;
  walletAddress: string;
}

const SuccessSection = ({ nftAddress, walletAddress }: SuccessSectionProps) => {
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const openSolanaExplorer = () => {
    window.open(`https://explorer.solana.com/address/${nftAddress}`, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto border-web3-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-web3-primary to-web3-secondary rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
          <Badge className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl text-web3-success">🎉 Badge Minted!</CardTitle>
        <CardDescription>
          You now own a Civic KYC Badge NFT.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border border-web3-border space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">NFT Address</p>
            <p className="font-mono text-sm">{shortenAddress(nftAddress)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-sm">{shortenAddress(walletAddress)}</p>
          </div>
        </div>
        <Button
          onClick={openSolanaExplorer}
          variant="outline"
          className="w-full border-web3-border hover:bg-web3-primary/10"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Solana Explorer
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessSection;
