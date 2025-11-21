# Celo Wallet Setup Guide

Complete setup instructions for the Celo Wallet application.

## Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- WalletConnect Project ID
- The Graph Studio account (for subgraph deployment)

## Step 1: Install Dependencies

From the root of the monorepo:

```bash
npm install
```

This will install dependencies for all packages in the workspace.

## Step 2: Configure WalletConnect

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your Project ID

## Step 3: Set Up The Graph Subgraph

### 3.1 Create The Graph Studio Account

1. Go to [The Graph Studio](https://thegraph.com/studio/)
2. Sign in with your wallet
3. Create a new subgraph named `angel-token-transfers`

### 3.2 Deploy the Subgraph

```bash
# Navigate to subgraph package
cd packages/subgraph

# Authenticate with your deploy key from The Graph Studio
graph auth --studio <YOUR_DEPLOY_KEY>

# Generate code
npm run codegen

# Build the subgraph
npm run build

# Deploy to The Graph Studio
npm run deploy
```

### 3.3 Get Your Subgraph URL

After deployment, you'll receive a query URL like:
```
https://api.studio.thegraph.com/query/<ID>/angel-token-transfers/version/latest
```

## Step 4: Configure Frontend Environment

1. Navigate to the frontend package:
```bash
cd packages/frontend
```

2. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` with your values:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_SUBGRAPH_URL=your_subgraph_query_url
```

## Step 5: Run the Application

From the root directory:

```bash
# Start the development server
npm run dev
```

Or from the frontend package:

```bash
cd packages/frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Step 6: Connect Your Wallet

1. Open the application in your browser
2. Click "Connect Wallet"
3. Select your wallet provider
4. Approve the connection
5. Make sure you're connected to Celo Mainnet

## Step 7: Add Celo Network to Your Wallet

If Celo Mainnet is not in your wallet:

### Network Details
- **Network Name**: Celo Mainnet
- **RPC URL**: `https://forno.celo.org`
- **Chain ID**: `42220`
- **Currency Symbol**: CELO
- **Block Explorer**: `https://celoscan.io`

## Step 8: Get AngelToken

You'll need some AngelToken to test transfers. The contract address is:
```
0x504D48d468d34F1849E84998652Ca3De0c7F0ECB
```

You can:
1. Add the token to your wallet using the contract address
2. Acquire tokens through exchanges or swaps that support AngelToken on Celo

## Troubleshooting

### Wallet Connection Issues

- Make sure you're on Celo Mainnet
- Try disconnecting and reconnecting your wallet
- Clear your browser cache and cookies

### Subgraph Not Loading

- Verify your `NEXT_PUBLIC_SUBGRAPH_URL` is correct
- Check if the subgraph has finished syncing in The Graph Studio
- The subgraph needs time to index historical data

### Transaction Failures

- Ensure you have enough CELO for gas fees
- Verify you have sufficient AngelToken balance
- Check that the recipient address is valid

## Development Commands

### Root Level
```bash
npm run dev              # Start frontend dev server
npm run build            # Build all packages
npm run frontend:dev     # Start frontend
npm run subgraph:codegen # Generate subgraph code
npm run subgraph:build   # Build subgraph
npm run subgraph:deploy  # Deploy subgraph
```

### Frontend Package
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Subgraph Package
```bash
npm run codegen      # Generate AssemblyScript types
npm run build        # Build subgraph
npm run deploy       # Deploy to The Graph Studio
npm run create-local # Create local subgraph (for testing)
npm run deploy-local # Deploy to local Graph Node
```

## Project Structure

```
celo-wallet/
├── packages/
│   ├── frontend/              # Next.js application
│   │   ├── src/
│   │   │   ├── app/          # Next.js app directory
│   │   │   ├── components/   # React components
│   │   │   ├── config/       # Configuration files
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── lib/          # Utility libraries
│   │   │   └── types/        # TypeScript types
│   │   └── package.json
│   └── subgraph/             # The Graph subgraph
│       ├── abis/             # Contract ABIs
│       ├── src/              # Mapping functions
│       ├── schema.graphql    # GraphQL schema
│       ├── subgraph.yaml     # Subgraph manifest
│       └── package.json
├── package.json              # Root workspace config
└── README.md
```

## Additional Resources

- [Celo Documentation](https://docs.celo.org/)
- [The Graph Documentation](https://thegraph.com/docs/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the documentation links
3. Check existing GitHub issues
4. Create a new issue with detailed information
