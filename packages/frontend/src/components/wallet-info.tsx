'use client';

import { useAccount, useEnsName } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAngelTokenBalance } from '@/hooks/use-angel-token';

export const WalletInfo = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { balance, isLoading } = useAngelTokenBalance(address);

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <div className="bg-neo-bg rounded-2xl shadow-neo p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Connect your wallet to start using AngelToken
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  const displayName = ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Wallet Info</h2>
          <p className="text-gray-600 text-sm font-mono">{displayName}</p>
        </div>
        <ConnectButton />
      </div>

      <div className="bg-neo-bg rounded-xl shadow-neo-inset p-4">
        <p className="text-sm text-gray-600 mb-1">AngelToken Balance</p>
        {isLoading ? (
          <div className="h-8 bg-neo-bg rounded shadow-neo-inset animate-pulse" />
        ) : (
          <p className="text-3xl font-bold text-gray-800">
            {parseFloat(balance).toFixed(4)} <span className="text-lg">ANGEL</span>
          </p>
        )}
      </div>
    </div>
  );
};
