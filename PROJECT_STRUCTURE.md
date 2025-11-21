# Project Structure

## Overview

This is a monorepo using npm workspaces with two main packages:
- **frontend**: Next.js application for the wallet UI
- **subgraph**: The Graph subgraph for indexing transfer events

## Directory Tree

```
celo-wallet/
├── packages/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── globals.css          # Global styles with neomorphism
│   │   │   │   ├── layout.tsx           # Root layout with providers
│   │   │   │   └── page.tsx             # Main page component
│   │   │   ├── components/
│   │   │   │   ├── providers.tsx        # Wagmi, RainbowKit, urql providers
│   │   │   │   ├── transfer-form.tsx    # Token transfer form
│   │   │   │   ├── transfer-history.tsx # Transfer history list
│   │   │   │   └── wallet-info.tsx      # Wallet connection & balance
│   │   │   ├── config/
│   │   │   │   ├── angel-token.ts       # AngelToken contract config & ABI
│   │   │   │   └── wagmi.ts             # Wagmi configuration
│   │   │   ├── hooks/
│   │   │   │   ├── use-angel-token.ts   # Token balance & transfer hooks
│   │   │   │   └── use-transfer-history.ts # The Graph query hook
│   │   │   ├── lib/
│   │   │   │   └── graphql-client.ts    # urql client configuration
│   │   │   └── types/
│   │   │       └── index.ts             # TypeScript type definitions
│   │   ├── .env.example                 # Environment variables template
│   │   ├── next.config.js               # Next.js configuration
│   │   ├── package.json                 # Frontend dependencies
│   │   ├── postcss.config.js            # PostCSS configuration
│   │   ├── tailwind.config.ts           # TailwindCSS with neomorphism
│   │   └── tsconfig.json                # TypeScript configuration
│   └── subgraph/
│       ├── abis/
│       │   └── ERC20.json               # ERC20 token ABI
│       ├── src/
│       │   └── mapping.ts               # Event handler mappings
│       ├── package.json                 # Subgraph dependencies
│       ├── README.md                    # Subgraph documentation
│       ├── schema.graphql               # GraphQL schema definition
│       ├── subgraph.yaml                # Subgraph manifest
│       └── tsconfig.json                # TypeScript configuration
├── .gitignore                           # Git ignore rules
├── package.json                         # Root workspace configuration
├── PROJECT_STRUCTURE.md                 # This file
├── QUICKSTART.md                        # Quick start guide
├── README.md                            # Main documentation
└── SETUP.md                             # Detailed setup instructions
```

## Key Technologies

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Web3**: Wagmi v2, Viem, RainbowKit
- **Styling**: TailwindCSS with custom neomorphism design
- **Data Fetching**: urql for GraphQL queries
- **State Management**: React hooks + Wagmi

### Subgraph
- **Indexer**: The Graph Protocol
- **Language**: AssemblyScript
- **Network**: Celo Mainnet
- **Contract**: AngelToken (ERC20)

## Component Architecture

### Frontend Components

1. **Providers** (`providers.tsx`)
   - Wraps app with Wagmi, RainbowKit, and urql providers
   - Manages Web3 connection state

2. **WalletInfo** (`wallet-info.tsx`)
   - Displays wallet connection status
   - Shows ENS name or address
   - Displays AngelToken balance
   - Connect/disconnect button

3. **TransferForm** (`transfer-form.tsx`)
   - Input for recipient address
   - Input for transfer amount
   - Validation and error handling
   - Transaction status feedback

4. **TransferHistory** (`transfer-history.tsx`)
   - Fetches transfers from The Graph
   - Filters by connected wallet
   - Displays sent/received transfers
   - Links to Celoscan explorer

### Custom Hooks

1. **useAngelTokenBalance**
   - Reads token balance for an address
   - Auto-refreshes on wallet change

2. **useAngelTokenInfo**
   - Fetches token name, symbol, decimals

3. **useAngelTokenTransfer**
   - Handles token transfer transactions
   - Manages transaction state
   - Waits for confirmation

4. **useTransferHistory**
   - Queries The Graph for transfer events
   - Filters by wallet address
   - Supports pagination

## Styling System

### Neomorphism Design

The UI uses a neomorphism (soft UI) design system:

- **Colors**:
  - Background: `#e0e5ec`
  - Light: `#ffffff`
  - Dark: `#a3b1c6`
  - Shadow: `#d1d9e6`

- **Shadows**:
  - `shadow-neo`: Standard raised effect
  - `shadow-neo-inset`: Pressed/input effect
  - `shadow-neo-sm`: Small raised effect
  - `shadow-neo-lg`: Large raised effect

- **Components**:
  - Rounded corners (xl, 2xl)
  - Dual-tone shadows (light + dark)
  - Subtle depth and elevation

## Data Flow

### Token Transfer Flow
```
User Input → TransferForm
  ↓
useAngelTokenTransfer hook
  ↓
Wagmi writeContract
  ↓
Wallet approval
  ↓
Transaction submitted
  ↓
Wait for confirmation
  ↓
Success feedback
```

### Transfer History Flow
```
Connected Wallet → useTransferHistory hook
  ↓
urql GraphQL query
  ↓
The Graph subgraph
  ↓
Filter by address
  ↓
Display in TransferHistory component
```

## Configuration Files

### Environment Variables
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID
- `NEXT_PUBLIC_SUBGRAPH_URL`: The Graph subgraph endpoint

### Wagmi Config
- Network: Celo Mainnet only
- RainbowKit integration
- SSR support enabled

### TailwindCSS Config
- Custom neomorphism colors
- Custom shadow utilities
- Extended theme

## Build & Deployment

### Frontend
```bash
npm run build          # Production build
npm run start          # Start production server
```

### Subgraph
```bash
npm run codegen        # Generate types
npm run build          # Build subgraph
npm run deploy         # Deploy to The Graph
```

## Testing Checklist

- [ ] Wallet connection works
- [ ] Balance displays correctly
- [ ] ENS names resolve
- [ ] Token transfers succeed
- [ ] Transaction history loads
- [ ] Neomorphism styling renders
- [ ] Mobile responsive
- [ ] Error handling works

## Future Enhancements

Potential improvements:
- Add token approval flow
- Support multiple tokens
- Add transaction notifications
- Implement dark mode
- Add transaction filtering
- Support other Celo networks (Alfajores testnet)
- Add QR code scanning
- Implement address book
