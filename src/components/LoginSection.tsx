import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { buttonStyles } from "@/utils/common";
import { useCivicAuth } from "@/hooks/useCivicAuth"; // Import the hook

const LoginSection = () => { // Remove onLogin prop
  const { login, logout, connected, pending, error, walletAddress } = useCivicAuth(); // Use the hook, add walletAddress

  if (connected) {
    return (
      <SectionCard
        title="Logged In"
        description={`You are connected with wallet: ${walletAddress || 'N/A'}`} // Display walletAddress
        centered
      >
        <Button
          onClick={logout} // Use logout from the hook
          className={buttonStyles}
          variant="outline"
        >
          Log Out
        </Button>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Get Started"
      description="We'll generate your secure wallet and verify your identity."
      centered
    >
      <Button 
        onClick={login} // Use login from the hook
        className={buttonStyles}
        disabled={pending} // Disable button when pending
      >
        {pending ? 'Logging in...' : 'Log in with Civic'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </SectionCard>
  );
};

export default LoginSection;
