# Deployment Checklist

Use this checklist to ensure proper deployment of the Celo Wallet application.

## Pre-Deployment

### 1. Environment Setup

- [ ] Node.js 18+ installed
- [ ] npm installed and updated
- [ ] Git repository initialized
- [ ] All dependencies installed (`npm install`)

### 2. Configuration

- [ ] WalletConnect Project ID obtained
- [ ] `.env.local` created in `packages/frontend`
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` set
- [ ] The Graph Studio account created
- [ ] Subgraph deployed (see Subgraph Deployment section)
- [ ] `NEXT_PUBLIC_SUBGRAPH_URL` set

### 3. Testing

- [ ] Frontend builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Wallet connection works
- [ ] Token balance displays
- [ ] Transfer functionality works
- [ ] Transaction history loads
- [ ] Mobile responsive
- [ ] Cross-browser tested

## Subgraph Deployment

### 1. Preparation

- [ ] The Graph CLI installed globally
- [ ] The Graph Studio account created
- [ ] Subgraph created in Studio (name: `angel-token-transfers`)
- [ ] Deploy key copied

### 2. Build & Deploy

```bash
cd packages/subgraph

# Authenticate
graph auth --studio <YOUR_DEPLOY_KEY>

# Generate types
npm run codegen

# Build
npm run build

# Deploy
npm run deploy
```

- [ ] Codegen completed without errors
- [ ] Build completed without errors
- [ ] Deployment successful
- [ ] Subgraph syncing started

### 3. Verification

- [ ] Subgraph appears in Studio dashboard
- [ ] Sync status shows progress
- [ ] Query endpoint URL available
- [ ] Test query returns data

### 4. Integration

- [ ] Subgraph URL copied
- [ ] `NEXT_PUBLIC_SUBGRAPH_URL` updated in frontend
- [ ] Frontend restarted
- [ ] Transfer history loads

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### 1. Preparation

- [ ] Vercel account created
- [ ] Vercel CLI installed (optional)
- [ ] GitHub repository connected (if using Git)

#### 2. Configuration

- [ ] Project imported to Vercel
- [ ] Root directory set to `packages/frontend`
- [ ] Framework preset: Next.js
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`

#### 3. Environment Variables

Add in Vercel dashboard:
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SUBGRAPH_URL`

#### 4. Deploy

- [ ] Initial deployment triggered
- [ ] Build successful
- [ ] Deployment URL received
- [ ] Site accessible

#### 5. Custom Domain (Optional)

- [ ] Domain added in Vercel
- [ ] DNS configured
- [ ] SSL certificate issued
- [ ] Domain accessible

### Option 2: Netlify

#### 1. Preparation

- [ ] Netlify account created
- [ ] Site created in Netlify

#### 2. Configuration

- [ ] Base directory: `packages/frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `packages/frontend/.next`

#### 3. Environment Variables

Add in Netlify dashboard:
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SUBGRAPH_URL`

#### 4. Deploy

- [ ] Deployment triggered
- [ ] Build successful
- [ ] Site live

### Option 3: Self-Hosted

#### 1. Server Setup

- [ ] Server provisioned (VPS, cloud instance, etc.)
- [ ] Node.js 18+ installed
- [ ] PM2 or similar process manager installed
- [ ] Nginx or Apache configured (optional)
- [ ] SSL certificate installed (Let's Encrypt)

#### 2. Application Setup

```bash
# Clone repository
git clone <your-repo-url>
cd celo-wallet

# Install dependencies
npm install

# Build frontend
cd packages/frontend
npm run build

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your values
```

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Build successful
- [ ] Environment variables set

#### 3. Process Management

```bash
# Using PM2
pm2 start npm --name "celo-wallet" -- start
pm2 save
pm2 startup
```

- [ ] Application started
- [ ] PM2 configured
- [ ] Auto-restart enabled
- [ ] Logs accessible

#### 4. Reverse Proxy (Optional)

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] Nginx configured
- [ ] SSL configured
- [ ] Domain accessible

## Post-Deployment

### 1. Verification

- [ ] Site loads correctly
- [ ] Wallet connection works
- [ ] Balance displays
- [ ] Transfers work
- [ ] History loads
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SSL certificate valid

### 2. Monitoring

- [ ] Error tracking set up (Sentry, etc.)
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Uptime monitoring enabled
- [ ] Performance monitoring active

### 3. Documentation

- [ ] Deployment documented
- [ ] Environment variables documented
- [ ] Access credentials secured
- [ ] Team notified

### 4. Backup

- [ ] Database backup configured (if applicable)
- [ ] Environment variables backed up
- [ ] Deployment configuration saved

## Maintenance

### Regular Tasks

- [ ] Monitor subgraph sync status
- [ ] Check application logs
- [ ] Review error reports
- [ ] Update dependencies monthly
- [ ] Test critical flows weekly

### Updates

When updating:
- [ ] Test in development
- [ ] Review changes
- [ ] Update dependencies
- [ ] Run build
- [ ] Deploy to staging (if available)
- [ ] Test in staging
- [ ] Deploy to production
- [ ] Verify production

## Troubleshooting

### Common Issues

#### Subgraph Not Syncing
- [ ] Check subgraph status in Studio
- [ ] Verify contract address is correct
- [ ] Check start block number
- [ ] Review subgraph logs

#### Wallet Connection Fails
- [ ] Verify WalletConnect Project ID
- [ ] Check network configuration
- [ ] Test with different wallet
- [ ] Check browser console

#### Transfers Fail
- [ ] Verify user has CELO for gas
- [ ] Check AngelToken balance
- [ ] Verify contract address
- [ ] Check network status

#### History Not Loading
- [ ] Verify subgraph URL
- [ ] Check subgraph sync status
- [ ] Test GraphQL query directly
- [ ] Check browser console

## Security Checklist

- [ ] Environment variables not committed
- [ ] API keys secured
- [ ] HTTPS enabled
- [ ] Dependencies updated
- [ ] No sensitive data in logs
- [ ] Rate limiting configured (if applicable)
- [ ] CORS configured properly

## Performance Checklist

- [ ] Images optimized
- [ ] Code splitting enabled
- [ ] Lazy loading implemented
- [ ] Caching configured
- [ ] CDN configured (if applicable)
- [ ] Lighthouse score > 90

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Alt text for images
- [ ] ARIA labels present

## Final Sign-Off

- [ ] All checklist items completed
- [ ] Stakeholders notified
- [ ] Documentation updated
- [ ] Support team briefed
- [ ] Monitoring active
- [ ] Backup verified

---

**Deployment Date**: _______________

**Deployed By**: _______________

**Version**: _______________

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________
