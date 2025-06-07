import { useAuth } from '@civic/auth-web3/react';
import { useMemo } from 'react';

export const useCivicAuth = () => {
  const { wallet, pending, connected, error, login, logout } = useAuth();

  const walletAddress = useMemo(() => {
    if (wallet?.publicKey) {
      return wallet.publicKey.toBase58();
    }
    return null;
  }, [wallet?.publicKey]);

  return {
    wallet,
    pending,
    connected,
    error: error ? (error instanceof Error ? error.message : String(error)) : null,
    login,
    logout,
    walletAddress,
  };
}; 