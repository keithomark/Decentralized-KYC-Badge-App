import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SectionCard } from "@/components/ui/section-card";
import { buttonStyles } from "@/utils/common";

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
    <SectionCard
      title="Get Your KYC Badge"
      description="Mint a permanent on-chain proof of your verified identity."
      centered
    >
      <Button
        onClick={handleMint}
        disabled={isMinting}
        className={buttonStyles}
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
    </SectionCard>
  );
};

export default MintSection;
