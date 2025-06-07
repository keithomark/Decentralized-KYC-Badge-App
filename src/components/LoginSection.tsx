import { SectionCard } from "@/components/ui/section-card";
import { useCivicAuth } from "@/hooks/useCivicAuth"; // Import the hook
import { UserButton } from '@civic/auth-web3/react'; // Import UserButton

const LoginSection = () => {
  // login and logout functions from useCivicAuth are now placeholders.
  // UserButton will handle the actual login/logout actions.
  const { connected, pending, error, walletAddress } = useCivicAuth();

  // The UserButton itself will show connection status and provide login/logout.
  // We can adjust the surrounding text or remove it if UserButton is sufficient.

  // If UserButton handles both login and logout states visually,
  // the conditional rendering based on `connected` within this component might change.
  // For now, let's keep the structure and see how UserButton behaves.

  if (connected) {
    return (
      <SectionCard
        title="Manage Your Session" // Title changed
        // Description can be simplified if UserButton shows address, or kept for clarity
        description={`You are connected. Wallet: ${walletAddress || 'N/A'}`}
        centered
      >
        <UserButton />
        {/* The UserButton when connected usually shows user info and acts as a logout/menu */}
        {pending && <p className="text-sm text-gray-500 mt-2">Processing...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </SectionCard>
    );
  }

  // When not connected, UserButton typically shows a "Log In" prompt
  return (
    <SectionCard
      title="Get Started"
      description="Connect with Civic to proceed. This will generate your secure wallet and allow identity verification."
      centered
    >
      <UserButton />
      {/* UserButton should prompt for login here */}
      {pending && <p className="text-sm text-gray-500 mt-2">Processing...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </SectionCard>
  );
};

export default LoginSection;
