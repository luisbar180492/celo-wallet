import { Address } from 'viem';

export interface TransferEvent {
  id: string;
  from: Address;
  to: Address;
  value: string;
  timestamp: string;
  transactionHash: string;
  blockNumber: string;
}

export interface TransferQueryVariables {
  address: Address;
  first?: number;
  skip?: number;
}

export interface TransferQueryResult {
  transfers: TransferEvent[];
}
