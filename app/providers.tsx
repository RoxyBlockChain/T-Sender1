"use client";

import dynamic from 'next/dynamic';

// Dynamically import the wallet provider without SSR
const WalletProvider = dynamic(
  () => import('./wallet-provider'),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}

export default Providers;