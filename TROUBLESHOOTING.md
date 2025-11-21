# Troubleshooting Guide

Common issues and their solutions for the Celo Wallet application.

## Installation Issues

### Problem: `npm install` fails

**Symptoms:**
- Error during dependency installation
- Package conflicts
- Version mismatches

**Solutions:**

1. **Check Node.js version:**
```bash
node -v  # Should be 18.0.0 or higher
```

2. **Clear npm cache:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

3. **Use correct npm version:**
```bash
npm install -g npm@latest
```

4. **Check for platform-specific issues:**
```bash
# On macOS with M1/M2
arch -x86_64 npm install
```

---

## Wallet Connection Issues

### Problem: Wallet won't connect

**Symptoms:**
- Connect button doesn't work
- Wallet popup doesn't appear
- Connection hangs

**Solutions:**

1. **Check WalletConnect Project ID:**
```bash
# Verify .env.local has correct ID
cat packages/frontend/.env.local
```

2. **Clear browser cache:**
- Clear site data
- Disable browser extensions
- Try incognito mode

3. **Check wallet extension:**
- Update wallet extension
- Try different wallet
- Check wallet is unlocked

4. **Verify network:**
- Ensure on Celo Mainnet
- Check RPC endpoint is working
- Try switching networks

### Problem: Wrong network error

**Symptoms:**
- "Please switch to Celo Mainnet" message
- Transactions fail

**Solutions:**

1. **Add Celo Mainnet to wallet:**
```
Network Name: Celo Mainnet
RPC URL: https://forno.celo.org
Chain ID: 42220
Currency Symbol: CELO
Block Explorer: https://celoscan.io
```

2. **Switch network in wallet:**
- Open wallet
- Select network dropdown
- Choose Celo Mainnet

---

## Balance Display Issues

### Problem: Balance shows 0 or doesn't load

**Symptoms:**
- Balance stuck at 0
- Loading spinner indefinitely
- Balance doesn't update

**Solutions:**

1. **Check wallet connection:**
```typescript
// In browser console
console.log(window.ethereum.selectedAddress)
```

2. **Verify AngelToken contract:**
- Contract: `0x504D48d468d34F1849E84998652Ca3De0c7F0ECB`
- Network: Celo Mainnet
- Check on Celoscan

3. **Add token to wallet:**
```
Token Contract: 0x504D48d468d34F1849E84998652Ca3De0c7F0ECB
Token Symbol: ANGEL
Decimals: 18
```

4. **Check RPC connection:**
```bash
curl https://forno.celo.org \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

---

## Transfer Issues

### Problem: Transfer transaction fails

**Symptoms:**
- Transaction rejected
- "Insufficient funds" error
- Transaction hangs

**Solutions:**

1. **Check CELO balance for gas:**
```
Minimum: ~0.01 CELO for gas fees
```

2. **Verify recipient address:**
- Must be valid Ethereum address
- Starts with 0x
- 42 characters total

3. **Check AngelToken balance:**
- Must have enough tokens
- Account for decimals (18)

4. **Increase gas limit:**
- Try manual gas settings
- Use higher gas price

5. **Check network congestion:**
- Wait and retry
- Check Celoscan for network status

### Problem: Transaction pending forever

**Symptoms:**
- Transaction stuck in pending
- No confirmation
- Can't send new transactions

**Solutions:**

1. **Check transaction on Celoscan:**
```
https://celoscan.io/tx/YOUR_TX_HASH
```

2. **Speed up transaction:**
- Use wallet's "speed up" feature
- Increase gas price

3. **Cancel transaction:**
- Use wallet's "cancel" feature
- Send 0 CELO to yourself with same nonce

4. **Reset wallet:**
- Settings → Advanced → Reset Account
- (This clears pending transactions)

---

## Transfer History Issues

### Problem: Transfer history not loading

**Symptoms:**
- Empty history
- Loading indefinitely
- Error message

**Solutions:**

1. **Check subgraph URL:**
```bash
# Verify .env.local
cat packages/frontend/.env.local | grep SUBGRAPH_URL
```

2. **Test subgraph directly:**
```bash
curl -X POST YOUR_SUBGRAPH_URL \
  -H "Content-Type: application/json" \
  -d '{"query":"{ transfers(first: 5) { id from to value } }"}'
```

3. **Check subgraph sync status:**
- Go to The Graph Studio
- Check subgraph dashboard
- Verify sync is complete

4. **Verify subgraph deployment:**
```bash
cd packages/subgraph
npm run codegen
npm run build
npm run deploy
```

### Problem: History shows wrong data

**Symptoms:**
- Missing transfers
- Duplicate entries
- Wrong amounts

**Solutions:**

1. **Check subgraph version:**
- Ensure latest version deployed
- Check deployment timestamp

2. **Verify contract address:**
```yaml
# In subgraph.yaml
address: "0x504D48d468d34F1849E84998652Ca3De0c7F0ECB"
```

3. **Re-index subgraph:**
- Deploy new version
- Wait for sync to complete

---

## Build Issues

### Problem: Frontend build fails

**Symptoms:**
- TypeScript errors
- Build errors
- Missing dependencies

**Solutions:**

1. **Check TypeScript errors:**
```bash
cd packages/frontend
npx tsc --noEmit
```

2. **Install missing dependencies:**
```bash
npm install
```

3. **Clear Next.js cache:**
```bash
rm -rf .next
npm run build
```

4. **Check for syntax errors:**
- Review recent changes
- Check imports
- Verify file paths

### Problem: Subgraph build fails

**Symptoms:**
- Codegen errors
- Build errors
- Missing types

**Solutions:**

1. **Regenerate types:**
```bash
cd packages/subgraph
npm run codegen
```

2. **Check schema:**
```bash
# Verify schema.graphql syntax
graph validate
```

3. **Check ABI:**
- Verify ERC20.json is valid
- Check event signatures

4. **Update Graph CLI:**
```bash
npm install -g @graphprotocol/graph-cli@latest
```

---

## Development Server Issues

### Problem: Dev server won't start

**Symptoms:**
- Port already in use
- Server crashes
- Module not found errors

**Solutions:**

1. **Check port availability:**
```bash
lsof -i :3000
# Kill process if needed
kill -9 PID
```

2. **Use different port:**
```bash
PORT=3001 npm run dev
```

3. **Clear node_modules:**
```bash
rm -rf node_modules package-lock.json
npm install
```

4. **Check for errors:**
```bash
npm run dev 2>&1 | tee debug.log
```

---

## UI/Styling Issues

### Problem: Neomorphism styles not working

**Symptoms:**
- Flat appearance
- No shadows
- Wrong colors

**Solutions:**

1. **Check Tailwind compilation:**
```bash
# Verify tailwind.config.ts
cat packages/frontend/tailwind.config.ts
```

2. **Rebuild CSS:**
```bash
rm -rf .next
npm run dev
```

3. **Check browser compatibility:**
- Use modern browser
- Enable CSS features
- Check for extensions blocking styles

4. **Verify class names:**
```tsx
// Correct
className="shadow-neo"

// Incorrect
className="shadow-neo-custom"
```

---

## Performance Issues

### Problem: Slow loading

**Symptoms:**
- Long initial load
- Slow interactions
- Laggy UI

**Solutions:**

1. **Check network speed:**
- Test RPC endpoint speed
- Try different RPC provider

2. **Optimize queries:**
- Reduce query size
- Add pagination
- Use caching

3. **Check browser:**
- Clear cache
- Disable extensions
- Update browser

4. **Monitor performance:**
```bash
# Use Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000
```

---

## Environment Variable Issues

### Problem: Environment variables not working

**Symptoms:**
- Undefined values
- Features not working
- Connection errors

**Solutions:**

1. **Check file name:**
```bash
# Must be .env.local (not .env)
ls -la packages/frontend/.env*
```

2. **Check variable names:**
```bash
# Must start with NEXT_PUBLIC_
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxx
NEXT_PUBLIC_SUBGRAPH_URL=xxx
```

3. **Restart dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

4. **Verify values:**
```typescript
// In browser console
console.log(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
```

---

## Browser Console Errors

### Common Errors and Solutions

#### Error: "Hydration failed"

**Solution:**
- Check for SSR/client mismatches
- Ensure consistent rendering
- Check for browser extensions

#### Error: "Module not found"

**Solution:**
```bash
npm install
# Check import paths
# Verify tsconfig paths
```

#### Error: "Cannot read property of undefined"

**Solution:**
- Add optional chaining: `obj?.property`
- Add null checks
- Use default values

#### Error: "Network request failed"

**Solution:**
- Check internet connection
- Verify RPC endpoint
- Check CORS settings

---

## Getting More Help

### Debug Information to Collect

When reporting issues, include:

1. **Environment:**
```bash
node -v
npm -v
# Browser and version
# Operating system
```

2. **Error messages:**
- Full error text
- Stack trace
- Console logs

3. **Steps to reproduce:**
- What you did
- What you expected
- What actually happened

4. **Configuration:**
- Network settings
- Environment variables (without secrets)
- Package versions

### Where to Get Help

- **GitHub Issues**: Report bugs
- **Documentation**: Check guides
- **Community**: Discord/Telegram
- **Stack Overflow**: Technical questions

### Useful Commands

```bash
# Check all versions
npm list

# View logs
npm run dev --verbose

# Test build
npm run build

# Check for updates
npm outdated

# Audit dependencies
npm audit

# Fix audit issues
npm audit fix
```

---

## Still Having Issues?

If none of these solutions work:

1. **Create minimal reproduction:**
   - Fresh install
   - Minimal configuration
   - Test if issue persists

2. **Check for known issues:**
   - GitHub Issues
   - Release notes
   - Changelog

3. **Report the issue:**
   - Use issue template
   - Provide debug info
   - Include reproduction steps

4. **Try alternative approaches:**
   - Different browser
   - Different network
   - Different wallet

Remember: Most issues are configuration-related. Double-check your setup! ✅
