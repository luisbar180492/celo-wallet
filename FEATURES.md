# Features Documentation

## Core Features

### 1. Wallet Connection 🔐

**Implementation**: RainbowKit + Wagmi

- **Multiple Wallet Support**:
  - MetaMask
  - Coinbase Wallet
  - WalletConnect
  - Rainbow
  - And more through RainbowKit

- **Network**: Celo Mainnet (Chain ID: 42220)

- **User Experience**:
  - One-click connection
  - Automatic network switching
  - Persistent connection state
  - Clean disconnect flow

**Files**:
- `src/components/wallet-info.tsx`
- `src/config/wagmi.ts`
- `src/components/providers.tsx`

---

### 2. ENS Support 🏷️

**Implementation**: Wagmi's `useEnsName` hook

- **Features**:
  - Automatic ENS resolution
  - Fallback to shortened address
  - Real-time updates

- **Display Format**:
  - ENS name: `vitalik.eth`
  - Fallback: `0x1234...5678`

**Files**:
- `src/components/wallet-info.tsx`

---

### 3. AngelToken Balance Display 💰

**Implementation**: Custom hook + Wagmi

- **Features**:
  - Real-time balance updates
  - Formatted display (4 decimals)
  - Loading states
  - Auto-refresh on transactions

- **Token Details**:
  - Name: AngelToken
  - Symbol: ANGEL
  - Decimals: 18
  - Contract: `0x504D48d468d34F1849E84998652Ca3De0c7F0ECB`

**Files**:
- `src/hooks/use-angel-token.ts`
- `src/components/wallet-info.tsx`
- `src/config/angel-token.ts`

---

### 4. Token Transfer 💸

**Implementation**: Wagmi + Viem

- **Features**:
  - Address validation
  - Amount validation
  - Transaction approval flow
  - Confirmation waiting
  - Success feedback
  - Error handling

- **Validation**:
  - Valid Ethereum address
  - Positive amount
  - Sufficient balance (wallet-level)

- **User Flow**:
  1. Enter recipient address
  2. Enter amount
  3. Click "Send Tokens"
  4. Approve in wallet
  5. Wait for confirmation
  6. View success screen
  7. Link to Celoscan

**Files**:
- `src/components/transfer-form.tsx`
- `src/hooks/use-angel-token.ts`

---

### 5. Transfer History 📊

**Implementation**: The Graph + urql

- **Features**:
  - Historical transfers
  - Sent/received filtering
  - Timestamp display
  - Amount formatting
  - Transaction links
  - Auto-refresh

- **Display**:
  - Sent transfers (red badge)
  - Received transfers (green badge)
  - Date and time
  - Amount with symbol
  - Counterparty address
  - Celoscan link

- **Data Source**: The Graph subgraph

**Files**:
- `src/components/transfer-history.tsx`
- `src/hooks/use-transfer-history.ts`
- `src/lib/graphql-client.ts`

---

### 6. Neomorphism UI 🎨

**Implementation**: TailwindCSS custom utilities

- **Design Principles**:
  - Soft shadows
  - Subtle depth
  - Minimal contrast
  - Clean aesthetics

- **Color Palette**:
  - Background: `#e0e5ec`
  - Light: `#ffffff`
  - Dark: `#a3b1c6`
  - Shadow: `#d1d9e6`

- **Shadow System**:
  - `shadow-neo`: Raised elements
  - `shadow-neo-inset`: Pressed/input fields
  - `shadow-neo-sm`: Small raised
  - `shadow-neo-lg`: Large raised

- **Components**:
  - Cards with soft shadows
  - Inset input fields
  - Rounded corners
  - Hover effects

**Files**:
- `tailwind.config.ts`
- `src/app/globals.css`
- All component files

---

## Technical Features

### 7. The Graph Integration 📈

**Subgraph Details**:
- **Network**: Celo Mainnet
- **Contract**: AngelToken ERC20
- **Events**: Transfer events
- **Query Language**: GraphQL

**Schema**:
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

**Queries**:
- Get all transfers for an address
- Filter by sender
- Filter by receiver
- Order by timestamp
- Pagination support

**Files**:
- `packages/subgraph/schema.graphql`
- `packages/subgraph/src/mapping.ts`
- `packages/subgraph/subgraph.yaml`

---

### 8. Type Safety 🛡️

**Implementation**: TypeScript

- **Strict Mode**: Enabled
- **Type Coverage**:
  - All components
  - All hooks
  - All configurations
  - Contract ABIs (as const)

- **Benefits**:
  - Compile-time error checking
  - IntelliSense support
  - Refactoring safety
  - Documentation

**Files**:
- `tsconfig.json` (frontend & subgraph)
- `src/types/index.ts`

---

### 9. Monorepo Architecture 📦

**Implementation**: npm workspaces

- **Packages**:
  - `@celo-wallet/frontend`
  - `@celo-wallet/subgraph`

- **Benefits**:
  - Shared dependencies
  - Unified scripts
  - Easy cross-package updates
  - Single repository

- **Scripts**:
  - Root-level commands
  - Package-specific commands
  - Workspace-aware installs

**Files**:
- `package.json` (root)
- `packages/*/package.json`

---

### 10. Responsive Design 📱

**Implementation**: TailwindCSS utilities

- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

- **Layout**:
  - Single column on mobile
  - Two columns on desktop
  - Flexible grid system

- **Components**:
  - Responsive cards
  - Flexible forms
  - Adaptive spacing

**Files**:
- All component files
- `tailwind.config.ts`

---

## Security Features

### 11. Input Validation ✅

- Address format validation
- Amount validation
- Type checking
- Error messages

### 12. Transaction Safety 🔒

- Wallet approval required
- Transaction confirmation
- Error handling
- Status feedback

### 13. Environment Variables 🔐

- API keys in environment
- No hardcoded secrets
- Example file provided
- Git-ignored

---

## User Experience Features

### 14. Loading States ⏳

- Balance loading
- Transaction pending
- History fetching
- Skeleton screens

### 15. Error Handling ❌

- Network errors
- Transaction failures
- Validation errors
- User-friendly messages

### 16. Success Feedback ✨

- Transaction success
- Balance updates
- Visual confirmation
- Explorer links

### 17. Accessibility ♿

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states

---

## Developer Experience

### 18. Hot Reload 🔥

- Next.js fast refresh
- Instant updates
- State preservation

### 19. Type Generation 🤖

- Subgraph types
- Contract types
- GraphQL types

### 20. Documentation 📚

- README files
- Setup guides
- Code comments
- Type definitions

---

## Future Feature Ideas

### Potential Enhancements:

1. **Multi-Token Support**
   - Support other ERC20 tokens
   - Token selection dropdown
   - Custom token addition

2. **Transaction Notifications**
   - Browser notifications
   - Toast messages
   - Email alerts

3. **Dark Mode**
   - Theme toggle
   - Persistent preference
   - Neomorphism dark variant

4. **Advanced Filtering**
   - Date range
   - Amount range
   - Transaction type

5. **Address Book**
   - Save contacts
   - ENS integration
   - Quick select

6. **QR Code Support**
   - Generate QR codes
   - Scan QR codes
   - Mobile camera access

7. **Testnet Support**
   - Alfajores testnet
   - Network switcher
   - Faucet integration

8. **Analytics Dashboard**
   - Transaction charts
   - Balance history
   - Statistics

9. **Export Features**
   - CSV export
   - PDF reports
   - Tax documents

10. **Multi-Language**
    - i18n support
    - Language switcher
    - RTL support
