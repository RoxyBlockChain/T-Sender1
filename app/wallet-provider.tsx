// app/wallet-provider.tsx
'use client';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, useConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  // Your wallet configuration here
  const config = useConfig();
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}