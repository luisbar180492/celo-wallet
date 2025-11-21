'use client';

import { useAccount } from 'wagmi';
import { WalletInfo } from '@/components/wallet-info';
import { TransferForm } from '@/components/transfer-form';
import { TransferHistory } from '@/components/transfer-history';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Celo Wallet
          </h1>
          <p className="text-gray-600">
            Send and receive AngelToken on Celo Mainnet
          </p>
        </div>

        {/* Main Content */}
        {!isConnected ? (
          <div className="mb-6">
            <WalletInfo />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WalletInfo />
            <TransferForm />
          </div>
        )}

        {/* Transfer History */}
        {isConnected && <TransferHistory />}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="bg-neo-bg rounded-2xl shadow-neo p-6 inline-block">
            <p className="text-sm text-gray-600 mb-2">
              AngelToken Contract
            </p>
            <a
              href="https://celoscan.io/address/0x504D48d468d34F1849E84998652Ca3De0c7F0ECB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-mono text-sm"
            >
              0x504D48d468d34F1849E84998652Ca3De0c7F0ECB
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
