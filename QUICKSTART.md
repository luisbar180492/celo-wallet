# Quick Start Guide

Get the Celo Wallet running in 5 minutes!

## 1. Install Dependencies

```bash
cd /Users/luisbar/Projects/ephemeral/celo-wallet
npm install
```

## 2. Set Up Environment Variables

```bash
cd packages/frontend
cp .env.example .env.local
```

Edit `.env.local` and add:
- Your WalletConnect Project ID from https://cloud.walletconnect.com/
- Your subgraph URL (or leave empty to deploy later)

## 3. Start Development Server

```bash
# From root directory
npm run dev
```

Visit `http://localhost:3000` 🎉

## 4. Deploy The Graph Subgraph (Optional)

The transfer history feature requires a deployed subgraph:

```bash
cd packages/subgraph

# Install Graph CLI globally
npm install -g @graphprotocol/graph-cli

# Authenticate with The Graph Studio
graph auth --studio <YOUR_DEPLOY_KEY>

# Generate, build, and deploy
npm run codegen
npm run build
npm run deploy
```

Then update `NEXT_PUBLIC_SUBGRAPH_URL` in `packages/frontend/.env.local`

## What You Can Do

✅ **Connect Wallet** - Connect using RainbowKit with multiple wallet options  
✅ **View Balance** - See your AngelToken balance  
✅ **Send Tokens** - Transfer AngelToken to any address  
✅ **View History** - See all your transfers (requires subgraph)  
✅ **ENS Support** - Display ENS names instead of addresses  

## Network Details

- **Network**: Celo Mainnet
- **Chain ID**: 42220
- **AngelToken**: `0x504D48d468d34F1849E84998652Ca3De0c7F0ECB`

## Need Help?

See `SETUP.md` for detailed instructions or troubleshooting.
