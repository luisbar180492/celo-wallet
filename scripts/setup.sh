#!/bin/bash

# Celo Wallet Setup Script
# This script helps you set up the development environment

set -e

echo "🚀 Celo Wallet Setup"
echo "===================="
echo ""

# Check Node.js version
echo "📋 Checking prerequisites..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18 or higher is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Setup frontend environment
echo "⚙️  Setting up frontend environment..."
cd packages/frontend
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "⚠️  Please edit packages/frontend/.env.local with your configuration:"
    echo "   - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID"
    echo "   - NEXT_PUBLIC_SUBGRAPH_URL"
else
    echo "ℹ️  .env.local already exists"
fi
cd ../..
echo ""

# Check if Graph CLI is installed
echo "🔍 Checking for Graph CLI..."
if ! command -v graph &> /dev/null; then
    echo "⚠️  Graph CLI not found. To deploy the subgraph, install it globally:"
    echo "   npm install -g @graphprotocol/graph-cli"
else
    echo "✅ Graph CLI installed: $(graph --version)"
fi
echo ""

echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Edit packages/frontend/.env.local with your configuration"
echo "   2. Get a WalletConnect Project ID from https://cloud.walletconnect.com/"
echo "   3. Deploy the subgraph (see packages/subgraph/README.md)"
echo "   4. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Setup Guide: SETUP.md"
echo "   - Features: FEATURES.md"
echo ""
echo "Happy coding! 🎉"
