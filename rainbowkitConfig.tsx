"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync, mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

import "dotenv/config";


 
export const config = getDefaultConfig({
  appName: "t-sender",
  projectId: "15fa46f50d501043a198ec929ac2b0e7",
  chains: [anvil, zksync, mainnet, polygon, optimism, arbitrum, base],
  ssr: false, //server side rendering disabled
});