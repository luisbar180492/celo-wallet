# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js Frontend (Port 3000)              │  │
│  │                                                         │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐ │  │
│  │  │   Wallet    │  │   Transfer   │  │   Transfer   │ │  │
│  │  │    Info     │  │     Form     │  │   History    │ │  │
│  │  └─────────────┘  └──────────────┘  └──────────────┘ │  │
│  │         │                 │                  │         │  │
│  │         └─────────────────┴──────────────────┘         │  │
│  │                           │                             │  │
│  │                    ┌──────▼──────┐                     │  │
│  │                    │  Providers  │                     │  │
│  │                    └──────┬──────┘                     │  │
│  └───────────────────────────┼──────────────────────────┘  │
└────────────────────────────┬─┼─────────────────────────────┘
                             │ │
                ┌────────────┘ └────────────┐
                │                            │
        ┌───────▼────────┐          ┌───────▼────────┐
        │  Wagmi/Viem    │          │  urql Client   │
        │  (Web3 Layer)  │          │  (GraphQL)     │
        └───────┬────────┘          └───────┬────────┘
                │                            │
        ┌───────▼────────┐          ┌───────▼────────┐
        │  RainbowKit    │          │   The Graph    │
        │  (Wallet UI)   │          │   Subgraph     │
        └───────┬────────┘          └───────┬────────┘
                │                            │
        ┌───────▼────────────────────────────▼────────┐
        │           Celo Mainnet Blockchain            │
        │                                              │
        │  ┌────────────────────────────────────────┐ │
        │  │  AngelToken Contract (ERC20)           │ │
        │  │  0x504D48d468d34F1849E84998652Ca3De0c │ │
        │  └────────────────────────────────────────┘ │
        └──────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Wallet Connection Flow

```
User clicks "Connect Wallet"
         │
         ▼
   RainbowKit Modal
         │
         ▼
   User selects wallet
         │
         ▼
   Wallet approval
         │
         ▼
   Wagmi stores connection
         │
         ▼
   useAccount hook updates
         │
         ▼
   Components re-render
         │
         ▼
   Balance fetched from contract
```

### 2. Token Transfer Flow

```
User enters recipient & amount
         │
         ▼
   Form validation
         │
         ▼
   useAngelTokenTransfer hook
         │
         ▼
   Wagmi writeContract
         │
         ▼
   Wallet popup (approval)
         │
         ▼
   User confirms
         │
         ▼
   Transaction submitted
         │
         ▼
   Wait for confirmation
         │
         ▼
   Success feedback
         │
         ▼
   Balance refreshes
         │
         ▼
   History updates (via The Graph)
```

### 3. Transaction History Flow

```
User connects wallet
         │
         ▼
   useTransferHistory hook
         │
         ▼
   urql GraphQL query
         │
         ▼
   The Graph Subgraph
         │
         ▼
   Filter by wallet address
         │
         ▼
   Return transfer events
         │
         ▼
   Display in UI
```

---

## Component Hierarchy

```
App (layout.tsx)
│
├── Providers
│   ├── WagmiProvider
│   ├── QueryClientProvider
│   ├── RainbowKitProvider
│   └── UrqlProvider
│
└── Page (page.tsx)
    │
    ├── Header
    │   └── Title & Description
    │
    ├── Main Content
    │   ├── WalletInfo
    │   │   ├── ConnectButton
    │   │   ├── ENS Display
    │   │   └── Balance Display
    │   │
    │   └── TransferForm (if connected)
    │       ├── Recipient Input
    │       ├── Amount Input
    │       ├── Validation
    │       └── Submit Button
    │
    ├── TransferHistory (if connected)
    │   └── Transfer Items
    │       ├── Direction Badge
    │       ├── Amount
    │       ├── Timestamp
    │       └── Explorer Link
    │
    └── Footer
        └── Contract Info
```

---

## State Management

### Global State (Wagmi)
- Wallet connection status
- Connected address
- Network/chain ID
- Account balance

### Component State (React)
- Form inputs
- Loading states
- Error messages
- UI interactions

### Server State (React Query + urql)
- Contract data (balance, info)
- Transaction history
- ENS names
- Cached queries

---

## Hook Architecture

### Custom Hooks

```typescript
useAngelTokenBalance(address)
├── useReadContract (Wagmi)
└── Returns: { balance, isLoading, error, refetch }

useAngelTokenTransfer()
├── useWriteContract (Wagmi)
├── useWaitForTransactionReceipt (Wagmi)
└── Returns: { transfer, hash, isPending, isSuccess }

useTransferHistory(address)
├── useQuery (urql)
└── Returns: { transfers, fetching, error, refetch }
```

---

## Configuration Layer

### Wagmi Config (`config/wagmi.ts`)
```typescript
- Network: Celo Mainnet
- RainbowKit integration
- WalletConnect Project ID
- SSR support
```

### Contract Config (`config/angel-token.ts`)
```typescript
- Contract address
- ABI definition
- Type exports
```

### GraphQL Client (`lib/graphql-client.ts`)
```typescript
- Subgraph URL
- urql client setup
- Cache configuration
```

---

## The Graph Subgraph Architecture

```
AngelToken Contract
         │
         ▼
   Transfer Events
         │
         ▼
   Subgraph Mapping
         │
         ▼
   Process Event Data
         │
         ▼
   Store in Graph Node
         │
         ▼
   GraphQL API
         │
         ▼
   Frontend Queries
```

### Subgraph Components

1. **Schema** (`schema.graphql`)
   - Defines Transfer entity
   - Fields: id, from, to, value, timestamp, etc.

2. **Manifest** (`subgraph.yaml`)
   - Contract address
   - Network (Celo)
   - Event handlers
   - Start block

3. **Mappings** (`src/mapping.ts`)
   - handleTransfer function
   - Processes Transfer events
   - Creates Transfer entities

---

## Security Architecture

### Frontend Security
- Environment variables for secrets
- Input validation
- Type safety (TypeScript)
- No private keys in code

### Smart Contract Interaction
- Read-only calls (balanceOf)
- User-approved writes (transfer)
- Transaction confirmation
- Error handling

### Network Security
- HTTPS only
- Secure RPC endpoints
- Wallet-level security
- No backend secrets

---

## Performance Optimization

### Frontend
- Next.js App Router
- React Server Components
- Code splitting
- Image optimization
- CSS optimization (Tailwind)

### Data Fetching
- React Query caching
- urql caching
- Optimistic updates
- Lazy loading

### Blockchain
- Efficient contract calls
- Batch requests
- Event filtering
- Indexed queries

---

## Deployment Architecture

### Frontend Deployment
```
GitHub Repository
         │
         ▼
   Vercel/Netlify
         │
         ▼
   Build Process
         │
         ▼
   CDN Distribution
         │
         ▼
   User Browser
```

### Subgraph Deployment
```
Local Development
         │
         ▼
   Graph CLI Build
         │
         ▼
   The Graph Studio
         │
         ▼
   Graph Network
         │
         ▼
   GraphQL Endpoint
```

---

## Error Handling Strategy

### Levels of Error Handling

1. **Input Validation**
   - Client-side validation
   - Type checking
   - Format validation

2. **Network Errors**
   - RPC failures
   - Timeout handling
   - Retry logic

3. **Transaction Errors**
   - Insufficient funds
   - User rejection
   - Contract errors

4. **UI Feedback**
   - Error messages
   - Loading states
   - Success confirmation

---

## Monitoring & Logging

### Frontend Monitoring
- Console errors
- Network requests
- Performance metrics
- User interactions

### Blockchain Monitoring
- Transaction status
- Gas usage
- Block confirmations
- Event emissions

### Subgraph Monitoring
- Sync status
- Query performance
- Error logs
- Index health

---

## Scalability Considerations

### Frontend Scalability
- Static generation
- CDN caching
- Code splitting
- Lazy loading

### Data Scalability
- Pagination
- Query limits
- Caching strategies
- Efficient indexing

### Blockchain Scalability
- Celo's fast blocks
- Low gas fees
- Efficient contracts
- Event filtering

---

## Technology Decisions

### Why Next.js?
- Server-side rendering
- File-based routing
- Built-in optimization
- Great developer experience

### Why RainbowKit?
- Beautiful UI
- Multiple wallet support
- Easy integration
- Maintained by Rainbow

### Why Wagmi?
- React hooks for Ethereum
- Type-safe
- Well-documented
- Active community

### Why The Graph?
- Efficient indexing
- GraphQL API
- Decentralized
- Industry standard

### Why Viem?
- Modern TypeScript
- Lightweight
- Type-safe
- Better than ethers.js

### Why TailwindCSS?
- Utility-first
- Easy customization
- Small bundle size
- Great for neomorphism

---

## Future Architecture Improvements

### Potential Enhancements

1. **Backend API**
   - User preferences
   - Notifications
   - Analytics

2. **Database**
   - User data
   - Transaction cache
   - Settings storage

3. **WebSocket**
   - Real-time updates
   - Live notifications
   - Price feeds

4. **Mobile App**
   - React Native
   - Shared logic
   - Native features

5. **Multi-chain**
   - Support other networks
   - Cross-chain transfers
   - Bridge integration

---

## Development Workflow

```
1. Local Development
   ├── npm run dev
   ├── Hot reload
   └── Browser testing

2. Build & Test
   ├── npm run build
   ├── Type checking
   └── Lint checking

3. Subgraph Deploy
   ├── npm run codegen
   ├── npm run build
   └── npm run deploy

4. Frontend Deploy
   ├── Push to GitHub
   ├── Auto-deploy (Vercel)
   └── Production live

5. Monitor
   ├── Check logs
   ├── Monitor errors
   └── User feedback
```

---

## Best Practices Implemented

✅ **Code Quality**
- TypeScript strict mode
- ESLint configuration
- Consistent formatting
- Code comments

✅ **Performance**
- Optimized builds
- Lazy loading
- Caching strategies
- Efficient queries

✅ **Security**
- No hardcoded secrets
- Input validation
- Type safety
- Error handling

✅ **UX**
- Loading states
- Error messages
- Success feedback
- Responsive design

✅ **Documentation**
- Comprehensive guides
- Code comments
- Type definitions
- Examples

---

This architecture provides a solid foundation for a production-ready Web3 application with room for future enhancements and scalability.
