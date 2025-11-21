import { useQuery } from 'urql';
import { Address } from 'viem';
import { TransferQueryResult, TransferQueryVariables } from '@/types';

const TRANSFERS_QUERY = `
  query GetTransfers($address: String!, $first: Int, $skip: Int) {
    transfers(
      first: $first
      skip: $skip
      orderBy: timestamp
      orderDirection: desc
      where: {
        or: [
          { from: $address }
          { to: $address }
        ]
      }
    ) {
      id
      from
      to
      value
      timestamp
      transactionHash
      blockNumber
    }
  }
`;

interface UseTransferHistoryParams {
  address?: Address;
  first?: number;
  skip?: number;
}

export const useTransferHistory = ({
  address,
  first = 20,
  skip = 0,
}: UseTransferHistoryParams) => {
  const [result, reexecuteQuery] = useQuery<
    TransferQueryResult,
    TransferQueryVariables
  >({
    query: TRANSFERS_QUERY,
    variables: {
      address: address?.toLowerCase() || '',
      first,
      skip,
    },
    pause: !address,
  });

  return {
    transfers: result.data?.transfers || [],
    fetching: result.fetching,
    error: result.error,
    refetch: reexecuteQuery,
  };
};
