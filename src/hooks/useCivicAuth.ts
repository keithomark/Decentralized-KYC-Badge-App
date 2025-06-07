import { useUser } from '@civic/auth-web3/react';
import { useMemo } from 'react';
import { PublicKey } from '@solana/web3.js'; // For type safety if publicKey is used

// Define a generic User type structure based on typical Civic patterns
interface GenericCivicUser {
  // Example: solana?: { address?: string; [key: string]: any };
  [key: string]: any;
}

// Define a minimal WalletAdapterCompatibleWallet for what Metaplex needs
interface WalletAdapterCompatibleWallet {
  publicKey: PublicKey | undefined; // Can be undefined initially
  signTransaction: (transaction: any) => Promise<any>;
  signAllTransactions: (transactions: any[]) => Promise<any[]>;
}

export const useCivicAuth = () => {
  const userContext = useUser();

  const user = userContext.user || null;

  // Directly expose userContext.wallet. Its structure is assumed to be
  // compatible or will be adapted later if necessary.
  // This is speculative. If userContext.wallet is not the signer, this will need changes.
  const wallet = (userContext.wallet || null) as WalletAdapterCompatibleWallet | null;

  const walletAddress = useMemo(() => {
    // Attempt to get address from wallet.publicKey, then from user object (e.g. user.solana.address)
    if (wallet?.publicKey) {
      try {
        return new PublicKey(wallet.publicKey).toBase58();
      } catch (e) {
        // console.warn("Wallet public key is not a valid PublicKey object", wallet.publicKey);
        // If wallet.publicKey is already a string, this might be an alternative path
        if (typeof wallet.publicKey === 'string') return wallet.publicKey;
      }
    }
    const genericUser = user as GenericCivicUser;
    if (genericUser?.solana?.address && typeof genericUser.solana.address === 'string') {
      return genericUser.solana.address;
    }
    // If user itself is the address (less common for Civic user object)
    if (typeof user === 'string' && user.length > 30 && user.length < 50) { // Basic check for Solana address format
        // This is a fallback and might not be correct for Civic user objects.
        // return user;
    }
    return null;
  }, [user, wallet]);

  // Connected state: True if user object exists.
  // Further checks (like userHasWallet or wallet presence) can be added if needed.
  const connected = !!user;

  // Pending state: Combine various loading flags from userContext.
  // The exact names (walletCreationInProgress, loading) are based on common patterns.
  const pending = !!(userContext as any).walletCreationInProgress || !!userContext.loading || false;

  const error = useMemo(() => {
    if (userContext.error) {
      return userContext.error instanceof Error ? userContext.error.message : String(userContext.error);
    }
    return null;
  }, [userContext.error]);

  const login = () => {
    console.warn("Login should be handled by Civic's UserButton or similar UI component.");
    // userContext.signIn?.(); // If manual sign-in is desired
  };

  const logout = () => {
    console.warn("Logout should be handled by Civic's UserButton or similar UI component.");
    // userContext.signOut?.(); // If manual sign-out is desired
  };

  return {
    user,
    wallet, // This is the object that needs to be compatible with Metaplex
    walletAddress,
    connected,
    pending,
    error,
    login,
    logout,
    // Optionally expose the raw userContext for advanced use cases or UserButton
    // civicUserContext: userContext,
  };
}; 