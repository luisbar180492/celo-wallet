'use client';

import { useState, FormEvent } from 'react';
import { Address, isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { useAngelTokenTransfer, useAngelTokenBalance } from '@/hooks/use-angel-token';

export const TransferForm = () => {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { transfer, isPending, isConfirming, isSuccess, hash } = useAngelTokenTransfer();
  const { refetch } = useAngelTokenBalance(address);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    if (!isAddress(recipient)) {
      setError('Invalid recipient address');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Invalid amount');
      return;
    }

    transfer(recipient as Address, amount);
  };

  const handleReset = () => {
    setRecipient('');
    setAmount('');
    setError('');
    refetch();
  };

  if (isSuccess) {
    return (
      <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-neo">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Transfer Successful!</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your transaction has been confirmed
          </p>
          {hash && (
            <a
              href={`https://celoscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-mono break-all"
            >
              View on Celoscan
            </a>
          )}
          <button
            onClick={handleReset}
            className="mt-6 w-full bg-neo-bg rounded-xl shadow-neo px-6 py-3 font-semibold text-gray-800 hover:shadow-neo-sm transition-all"
          >
            Make Another Transfer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Send AngelToken</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            disabled={isPending || isConfirming}
            className="w-full bg-neo-bg rounded-xl shadow-neo-inset px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ANGEL)
          </label>
          <input
            id="amount"
            type="number"
            step="0.000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            disabled={isPending || isConfirming}
            className="w-full bg-neo-bg rounded-xl shadow-neo-inset px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full bg-neo-bg rounded-xl shadow-neo px-6 py-3 font-semibold text-gray-800 hover:shadow-neo-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? 'Waiting for approval...'
            : isConfirming
            ? 'Confirming transaction...'
            : 'Send Tokens'}
        </button>
      </form>
    </div>
  );
};
