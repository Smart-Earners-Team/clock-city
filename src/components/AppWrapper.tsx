import React, { useContext } from 'react';
import { ThemeContext } from './Theme/ThemeContext';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig, Chain } from 'wagmi'

export const tnautilus = {
  id: 91002,
  name: 'Nautilus Testnet',
  network: 'nautilus',
  nativeCurrency: {
    decimals: 18,
    name: 'Zebec',
    symbol: 'tZBC',
  },
  rpcUrls: {
    public: { http: ['https://triton.api.nautchain.xyz'] },
    default: { http: ['https://triton.api.nautchain.xyz'] },
  },
  blockExplorers: {
    etherscan: { name: 'TritonScan', url: 'https://triton.nautscan.com' },
    default: { name: 'TritonScan', url: 'https://triton.nautscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25915048,
    },
  },
} as const satisfies Chain

const chains = [tnautilus]
const projectId = ''

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export interface GlobalTypes {
  className?: string | undefined;
  children?: React.ReactNode;
}

export const AppWrapper = ({ children, className }: GlobalTypes) => {  

  const { isDark } = useContext(ThemeContext);

  return (    
    <div className={`${className} ${isDark ? 'bg-gradient-to-br from-blue-950 to-gray-900 text-slate-50' : 'bg-slate-50'}`}>
      <WagmiConfig config={wagmiConfig}>
        {children}
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} defaultChain={tnautilus} />
      </WagmiConfig>
    </div>
  );
};

// function parseTokenURI(tokenURI) {
//   let base64String = tokenURI.replace("data:application/json;base64,", "");
//   let json = atob(base64String);
//   let parsedData = JSON.parse(json);
//   return parsedData;
// }
