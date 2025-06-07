import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity, bundlrStorage } from '@metaplex-foundation/js'; // Changed keypairIdentity to walletAdapterIdentity
import { useAuth } from '@civic/auth-web3';
import { NFTStorage, File } from 'nft.storage';

// Initialize NFT.Storage client
const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY || '';
if (!NFT_STORAGE_KEY) {
  console.warn("VITE_NFT_STORAGE_KEY is not set. Please update your .env file.");
}
const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });

// Badge metadata
const BADGE_METADATA = {
  name: 'Civic KYC Badge',
  symbol: 'KYC',
  description: 'Verified identity via Civic Auth',
  image: 'https://arweave.net/your-badge-image-url', // Will be updated with IPFS URL
};

// Minimum SOL required for minting (0.1 SOL)
const MIN_SOL_REQUIRED = 0.1 * LAMPORTS_PER_SOL;

export const mintKycBadge = async (wallet: ReturnType<typeof useAuth>['wallet']) => {
  if (!wallet?.publicKey) {
    throw new Error('Wallet not connected');
  }

  try {
    // Connect to Solana Devnet
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    
    // Check SOL balance
    const balance = await connection.getBalance(wallet.publicKey);
    if (balance < MIN_SOL_REQUIRED) {
      throw new Error(`Insufficient SOL balance. Required: ${MIN_SOL_REQUIRED / LAMPORTS_PER_SOL} SOL`);
    }

    // Fetch placeholder badge image
    const response = await fetch('/badge.png');
    if (!response.ok) {
      throw new Error(`Failed to fetch placeholder badge image: ${response.statusText}`);
    }
    const imageBase64 = await response.text();
    // Convert base64 to Blob
    const byteString = atob(imageBase64);
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const imageBlob = new Blob([ia], { type: 'image/png' });
    const imageFile = new File([imageBlob], 'badge.png', { type: 'image/png' });

    // Upload badge image to IPFS
    const imageCid = await nftStorage.storeBlob(imageFile);
    const imageUrl = `https://ipfs.io/ipfs/${imageCid}`;

    // Create and upload metadata to IPFS
    const metadata = {
      ...BADGE_METADATA, // Spread existing metadata
      image: imageUrl, // Update image to IPFS URL
    };
    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });
    const metadataCid = await nftStorage.storeBlob(metadataFile);
    const metadataUrl = `https://ipfs.io/ipfs/${metadataCid}`;
    
    // Initialize Metaplex with Bundlr storage
    const metaplex = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet)) // Changed here
      .use(bundlrStorage());
    
    // Create NFT
    const { nft } = await metaplex.nfts().create({
      uri: metadataUrl,
      name: BADGE_METADATA.name,
      symbol: BADGE_METADATA.symbol,
      sellerFeeBasisPoints: 0, // No royalties
      isMutable: false,
      updateAuthority: wallet.publicKey,
      mintAuthority: wallet.publicKey,
    });

    return {
      success: true,
      mintAddress: nft.address.toString(),
      transactionId: nft.mintAddress.toString(),
      metadataUrl,
      imageUrl,
    };
  } catch (error) {
    console.error('Error minting NFT:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to mint badge: ${error.message}`);
    }
    throw new Error('Failed to mint badge: Unknown error');
  }
}; 