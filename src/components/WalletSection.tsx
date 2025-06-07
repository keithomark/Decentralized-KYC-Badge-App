import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SectionCard } from "@/components/ui/section-card";
import { shortenAddress, outlineButtonStyles } from "@/utils/common";
import { useCivicAuth } from "@/hooks/useCivicAuth"; // Import the hook

const WalletSection = () => { // Remove walletAddress prop
  const { walletAddress } = useCivicAuth(); // Use the hook
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!walletAddress) return; // Guard against null walletAddress
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
      toast({ // Add toast for copy failure
        title: "Copy Failed",
        description: "Could not copy address to clipboard.",
        variant: "destructive",
      });
    }
  };

  if (!walletAddress) { // Render nothing or a placeholder if walletAddress is not available
    return null;
  }

  return (
    <SectionCard
      title="Your Wallet"
      description="Your Solana wallet address"
    >
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg border border-web3-border">
          <p className="font-mono text-sm text-center">{shortenAddress(walletAddress)}</p>
        </div>
        <Button
          onClick={copyAddress}
          variant="outline"
          className={outlineButtonStyles}
          disabled={!walletAddress} // Disable button if no address
        >
          {copied ? "Copied!" : "Copy Address"}
        </Button>
      </div>
    </SectionCard>
  );
};

export default WalletSection;
