import { WebSocketProvider } from 'ethers';

if (!process.env.NEXT_PUBLIC_ALCHEMY_WSS) {
    throw new Error('Missing ALCHEMY WSS URL in .env.local');
}

export const provider = new WebSocketProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_WSS as string
);
