
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MintSectionProps {
  onMint: () => void;
}

const MintSection = ({ onMint }: MintSectionProps) => {
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      onMint();
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-web3-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Get Your KYC Badge</CardTitle>
        <CardDescription>
          Mint a permanent on-chain proof of your verified identity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleMint}
          disabled={isMinting}
          className="w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
        >
          {isMinting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting...
            </>
          ) : (
            "Mint My Badge"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MintSection;
