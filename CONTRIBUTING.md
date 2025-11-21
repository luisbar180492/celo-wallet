# Contributing to Celo Wallet

Thank you for your interest in contributing to Celo Wallet! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- A Web3 wallet for testing

### Setup Development Environment

1. **Fork and Clone**
```bash
git clone https://github.com/your-username/celo-wallet.git
cd celo-wallet
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
```bash
cd packages/frontend
cp .env.example .env.local
# Add your WalletConnect Project ID and Subgraph URL
```

4. **Start Development Server**
```bash
npm run dev
```

## Project Structure

```
celo-wallet/
├── packages/
│   ├── frontend/     # Next.js application
│   └── subgraph/     # The Graph subgraph
└── package.json      # Root workspace config
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Build to check for errors
npm run build

# Test manually in browser
npm run dev
```

### 4. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in transfer form"
git commit -m "docs: update README"
git commit -m "style: improve neomorphism shadows"
git commit -m "refactor: simplify wallet connection logic"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types, avoid `any`
- Use interfaces for object shapes
- Export types when needed

```typescript
// Good
interface TransferFormProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

// Avoid
const props: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use descriptive prop names

```typescript
// Good
export const WalletInfo = () => {
  const { address } = useAccount();
  // ...
};

// Component structure
export const ComponentName = () => {
  // 1. Hooks
  // 2. State
  // 3. Effects
  // 4. Handlers
  // 5. Render
};
```

### Naming Conventions

- **Components**: PascalCase (`WalletInfo.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAngelToken.ts`)
- **Files**: kebab-case (`angel-token.ts`)
- **Constants**: UPPER_SNAKE_CASE (`ANGEL_TOKEN_ADDRESS`)
- **Functions**: camelCase (`handleTransfer`)

### File Organization

```typescript
// 1. Imports - external
import { useState } from 'react';
import { useAccount } from 'wagmi';

// 2. Imports - internal
import { useAngelToken } from '@/hooks/use-angel-token';
import { ANGEL_TOKEN_ADDRESS } from '@/config/angel-token';

// 3. Types
interface Props {
  // ...
}

// 4. Component
export const Component = () => {
  // ...
};
```

### CSS/Styling

- Use TailwindCSS utilities
- Follow neomorphism design system
- Use custom shadow utilities
- Keep styles consistent

```tsx
// Good - using Tailwind utilities
<div className="bg-neo-bg rounded-2xl shadow-neo p-6">

// Avoid - inline styles
<div style={{ backgroundColor: '#e0e5ec' }}>
```

## Adding New Features

### Frontend Features

1. **Create Component**
   - Add to `src/components/`
   - Use TypeScript
   - Follow naming conventions

2. **Create Hook (if needed)**
   - Add to `src/hooks/`
   - Export from hook file
   - Document parameters and return values

3. **Update Types**
   - Add to `src/types/index.ts`
   - Export properly

4. **Test Thoroughly**
   - Test all user flows
   - Test error states
   - Test loading states

### Subgraph Changes

1. **Update Schema**
   - Modify `schema.graphql`
   - Run `npm run codegen`

2. **Update Mappings**
   - Modify `src/mapping.ts`
   - Handle new events

3. **Test Locally**
   - Deploy to local Graph Node
   - Test queries

4. **Update Frontend**
   - Update GraphQL queries
   - Update types

## Testing Guidelines

### Manual Testing Checklist

- [ ] Wallet connection works
- [ ] Balance displays correctly
- [ ] Transfers succeed
- [ ] History loads
- [ ] Error handling works
- [ ] Loading states display
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### Test Cases to Consider

1. **Happy Path**
   - User connects wallet
   - User views balance
   - User sends tokens
   - Transaction succeeds

2. **Error Cases**
   - Invalid address
   - Insufficient balance
   - Network errors
   - Transaction rejection

3. **Edge Cases**
   - No wallet installed
   - Wrong network
   - Disconnected wallet
   - Empty history

## Documentation

### When to Update Documentation

- Adding new features
- Changing configuration
- Updating dependencies
- Fixing bugs that affect usage

### Documentation Files

- `README.md` - Overview and quick start
- `SETUP.md` - Detailed setup instructions
- `FEATURES.md` - Feature documentation
- `DEPLOYMENT_CHECKLIST.md` - Deployment guide
- Code comments - Complex logic

## Pull Request Guidelines

### PR Title

Use conventional commit format:
```
feat: add transaction filtering
fix: resolve balance display issue
docs: update setup instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (specify)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tested locally
- [ ] Tested on testnet
- [ ] Tested on mainnet
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Builds successfully
```

### Review Process

1. Submit PR
2. Automated checks run
3. Code review by maintainer
4. Address feedback
5. Approval and merge

## Common Tasks

### Adding a New Component

```bash
# Create component file
touch packages/frontend/src/components/new-component.tsx
```

```typescript
'use client';

import { FC } from 'react';

interface NewComponentProps {
  // Define props
}

export const NewComponent: FC<NewComponentProps> = (props) => {
  return (
    <div className="bg-neo-bg rounded-2xl shadow-neo p-6">
      {/* Component content */}
    </div>
  );
};
```

### Adding a New Hook

```bash
# Create hook file
touch packages/frontend/src/hooks/use-new-hook.ts
```

```typescript
import { useState, useEffect } from 'react';

export const useNewHook = () => {
  const [state, setState] = useState();

  // Hook logic

  return {
    // Return values
  };
};
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update specific package
npm update package-name

# Update all packages
npm update

# Test after updating
npm run build
npm run dev
```

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security**: Email security@example.com
- **Chat**: Join our Discord/Telegram

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
