import { CivicAuthProvider } from '@civic/auth-web3';

export const civicConfig = {
  clientId: process.env.VITE_CIVIC_CLIENT_ID || 'your-client-id',
  appName: 'Decentralized KYC Badge',
  appDescription: 'Mint your KYC badge as an NFT',
  appUrl: window.location.origin,
  appIcon: `${window.location.origin}/favicon.ico`,
  chain: 'solana',
  network: 'devnet',
  displayMode: 'iframe' as const,
};

export const authProvider = new CivicAuthProvider(civicConfig); 