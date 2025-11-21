# AngelToken Transfers Subgraph

This subgraph indexes Transfer events from the AngelToken ERC20 contract on Celo Mainnet.

## Contract Details

- **Network**: Celo Mainnet
- **Contract Address**: `0x504D48d468d34F1849E84998652Ca3De0c7F0ECB`
- **Type**: ERC20 Token

## Setup

### Prerequisites

1. Install The Graph CLI globally:
```bash
npm install -g @graphprotocol/graph-cli
```

2. Create an account on [The Graph Studio](https://thegraph.com/studio/)

### Deployment Steps

1. **Authenticate with The Graph Studio**:
```bash
graph auth --studio <YOUR_DEPLOY_KEY>
```

2. **Generate code from schema**:
```bash
npm run codegen
```

3. **Build the subgraph**:
```bash
npm run build
```

4. **Deploy to The Graph Studio**:
```bash
npm run deploy
```

## Schema

### Transfer Entity

```graphql
type Transfer @entity {
  id: ID!
  from: Bytes!
  to: Bytes!
  value: BigInt!
  timestamp: BigInt!
  blockNumber: BigInt!
  transactionHash: Bytes!
}
```

## Example Queries

### Get all transfers for an address

```graphql
query GetTransfers($address: String!) {
  transfers(
    where: {
      or: [
        { from: $address }
        { to: $address }
      ]
    }
    orderBy: timestamp
    orderDirection: desc
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
```

### Get sent transfers

```graphql
query GetSentTransfers($address: String!) {
  transfers(
    where: { from: $address }
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    to
    value
    timestamp
    transactionHash
  }
}
```

### Get received transfers

```graphql
query GetReceivedTransfers($address: String!) {
  transfers(
    where: { to: $address }
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    from
    value
    timestamp
    transactionHash
  }
}
```

## Local Development

To test locally with a Graph Node:

```bash
# Create local subgraph
npm run create-local

# Deploy to local node
npm run deploy-local
```

## Notes

- The subgraph starts indexing from block 0. You may want to update the `startBlock` in `subgraph.yaml` to a more recent block for faster initial sync.
- After deployment, it may take some time for the subgraph to fully sync with the blockchain.
- Make sure to update the frontend's `NEXT_PUBLIC_SUBGRAPH_URL` environment variable with your deployed subgraph endpoint.
