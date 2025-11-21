# Celo Wallet - AngelToken Transfer Application

A modern wallet application for Celo Mainnet with AngelToken (ERC20) transfer capabilities and The Graph integration for transaction history.

## Demo
![Demo](./video.mov)

## Features

- 🔐 **Wallet Connection**: Connect using RainbowKit with multiple wallet support
- 🏷️ **ENS Support**: Display ENS names instead of addresses
- 💸 **AngelToken Transfers**: Send AngelToken (ERC20) to any address
- 📊 **Transaction History**: View transfer events using The Graph
- 🎨 **Neomorphism UI**: Modern neomorphic design with TailwindCSS

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **Web3**: Wagmi v2, Viem, RainbowKit
- **Styling**: TailwindCSS with neomorphism design
- **Data**: The Graph (GraphQL), urql
- **Blockchain**: Celo Mainnet

## AngelToken Details

- **Contract Address**: `0x504D48d468d34F1849E84998652Ca3De0c7F0ECB`
- **Network**: Celo Mainnet
- **Type**: ERC20 Token

## Project Structure

```
celo-wallet/
├── packages/
│   ├── frontend/          # Next.js application
│   └── subgraph/          # The Graph subgraph
└── package.json           # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

```bash
# Install dependencies
npm install

# Start frontend development server
npm run dev
```

### Development

```bash
# Run frontend
npm run frontend:dev

# Build all packages
npm run build

# Subgraph commands
npm run subgraph:codegen
npm run subgraph:build
npm run subgraph:deploy
```

## Environment Variables

Create a `.env.local` file in `packages/frontend`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_SUBGRAPH_URL=your_subgraph_endpoint
```

## License

MIT
