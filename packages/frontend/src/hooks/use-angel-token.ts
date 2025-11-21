import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address, parseUnits, formatUnits } from 'viem';
import { ANGEL_TOKEN_ADDRESS, ANGEL_TOKEN_ABI } from '@/config/angel-token';

export const useAngelTokenBalance = (address?: Address) => {
  const { data, isLoading, error, refetch } = useReadContract({
    address: ANGEL_TOKEN_ADDRESS,
    abi: ANGEL_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  return {
    balance: data ? formatUnits(data as bigint, 18) : '0',
    isLoading,
    error,
    refetch,
  };
};

export const useAngelTokenInfo = () => {
  const { data: name } = useReadContract({
    address: ANGEL_TOKEN_ADDRESS,
    abi: ANGEL_TOKEN_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: ANGEL_TOKEN_ADDRESS,
    abi: ANGEL_TOKEN_ABI,
    functionName: 'symbol',
  });

  const { data: decimals } = useReadContract({
    address: ANGEL_TOKEN_ADDRESS,
    abi: ANGEL_TOKEN_ABI,
    functionName: 'decimals',
  });

  return {
    name: name as string,
    symbol: symbol as string,
    decimals: decimals as number,
  };
};

export const useAngelTokenTransfer = () => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const transfer = (to: Address, amount: string) => {
    try {
      console.log('Transfering', amount, 'ANGEL to', to);
      const amountInWei = parseUnits(amount, 18);
      console.log('Amount in wei:', amountInWei);
      writeContract({
        address: ANGEL_TOKEN_ADDRESS,
        abi: ANGEL_TOKEN_ABI,
        functionName: 'transfer',
        args: [to, amountInWei],
      });
    } catch (err) {
      console.error('Transfer error:', err);
    }
  };

  return {
    transfer,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
};
