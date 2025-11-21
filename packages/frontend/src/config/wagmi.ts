import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { celo } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Celo Wallet - AngelToken',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [celo],
  ssr: true,
});
