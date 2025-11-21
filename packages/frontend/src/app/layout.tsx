import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Celo Wallet - AngelToken',
  description: 'Send and receive AngelToken on Celo Mainnet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
