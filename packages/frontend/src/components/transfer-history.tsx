'use client';

import { useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { useTransferHistory } from '@/hooks/use-transfer-history';

export const TransferHistory = () => {
  const { address } = useAccount();
  const { transfers, fetching, error } = useTransferHistory({ address });

  if (!address) {
    return null;
  }

  if (error) {
    return (
      <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transfer History</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            Unable to load transfer history. Make sure The Graph subgraph is deployed and configured.
          </p>
        </div>
      </div>
    );
  }

  if (fetching) {
    return (
      <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transfer History</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-neo-bg rounded-xl shadow-neo-inset p-4 animate-pulse">
              <div className="h-4 bg-neo-shadow rounded w-3/4 mb-2" />
              <div className="h-3 bg-neo-shadow rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (transfers.length === 0) {
    return (
      <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transfer History</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">No transfers found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Transfer History</h2>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {transfers.map((transfer) => {
          const isSent = transfer.from.toLowerCase() === address.toLowerCase();
          const amount = formatUnits(BigInt(transfer.value), 18);
          const date = new Date(parseInt(transfer.timestamp) * 1000);

          return (
            <div
              key={transfer.id}
              className="bg-neo-bg rounded-xl shadow-neo-inset p-4 hover:shadow-neo-sm transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        isSent
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {isSent ? 'Sent' : 'Received'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    {isSent ? 'To: ' : 'From: '}
                    {isSent
                      ? `${transfer.to.slice(0, 6)}...${transfer.to.slice(-4)}`
                      : `${transfer.from.slice(0, 6)}...${transfer.from.slice(-4)}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    {isSent ? '-' : '+'}
                    {parseFloat(amount).toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-500">ANGEL</p>
                </div>
              </div>
              <a
                href={`https://celoscan.io/tx/${transfer.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 font-mono"
              >
                View on Celoscan →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
