import { useCallback, useEffect, useState } from 'react';
import { CivicPass } from '@civic/auth-web3';
import { Connection, PublicKey } from '@solana/web3.js';

interface UseCivicAuthReturn {
  wallet: PublicKey | null;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useCivicAuth = (): UseCivicAuthReturn => {
  const [wallet, setWallet] = useState<PublicKey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize Civic Pass
      const pass = new CivicPass();
      await pass.connect();

      // Get the connected wallet address
      const walletAddress = await pass.getWalletAddress();
      setWallet(new PublicKey(walletAddress));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      setWallet(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet(null);
  }, []);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        const pass = new CivicPass();
        const isConnected = await pass.isConnected();
        
        if (isConnected) {
          const walletAddress = await pass.getWalletAddress();
          setWallet(new PublicKey(walletAddress));
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  return {
    wallet,
    isLoading,
    error,
    connect,
    disconnect,
  };
}; 