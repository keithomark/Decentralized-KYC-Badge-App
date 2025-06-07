import { useUser } from '@civic/auth-web3/react';
import { useCallback, useMemo } from 'react';

interface EthereumUser {
  ethereum: {
    address: string;
  };
}

interface SolanaUser {
  solana: {
    address: string;
  };
}

type Web3User = EthereumUser | SolanaUser;

export const WalletInfo = () => {
  const { user, signIn, signOut, isLoading, error } = useUser();

  const getWalletAddress = useCallback(() => {
    if (!user) return null;
    const userObj = user as unknown as Web3User;
    if ('ethereum' in userObj) {
      return userObj.ethereum.address;
    }
    if ('solana' in userObj) {
      return userObj.solana.address;
    }
    return null;
  }, [user]);

  const walletAddress = useMemo(() => getWalletAddress(), [getWalletAddress]);

  const handleSignIn = useCallback(() => {
    signIn();
  }, [signIn]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect with Civic'}
        </button>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">Connected Wallet</h2>
        <p className="text-sm text-gray-600 break-all">
          {walletAddress}
        </p>
      </div>
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isLoading ? 'Disconnecting...' : 'Disconnect'}
      </button>
    </div>
  );
}; 