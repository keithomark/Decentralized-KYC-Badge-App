import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { buttonStyles } from "@/utils/common";

interface LoginSectionProps {
  onLogin: () => void;
}

const LoginSection = ({ onLogin }: LoginSectionProps) => {
  return (
    <SectionCard
      title="Get Started"
      description="We'll generate your secure wallet and verify your identity."
      centered
    >
      <Button 
        onClick={onLogin}
        className={buttonStyles}
      >
        Log in with Civic
      </Button>
    </SectionCard>
  );
};

export default LoginSection;
