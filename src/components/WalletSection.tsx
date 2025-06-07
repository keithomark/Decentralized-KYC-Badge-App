
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface WalletSectionProps {
  walletAddress: string;
}

const WalletSection = ({ walletAddress }: WalletSectionProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Wallet address has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-web3-border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Your Wallet</CardTitle>
        <CardDescription>Your Solana wallet address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border border-web3-border">
          <p className="font-mono text-sm text-center">{shortenAddress(walletAddress)}</p>
        </div>
        <Button
          onClick={copyAddress}
          variant="outline"
          className="w-full border-web3-border hover:bg-web3-primary/10"
        >
          {copied ? "Copied!" : "Copy Address"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletSection;
