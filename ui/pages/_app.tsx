import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, optimismGoerli, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo-client";

const { chains, provider, webSocketProvider } = configureChains(
  [
    optimismGoerli
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'OpenContent Studio',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#000000',
        accentColorForeground: 'white',
        borderRadius: 'small',
        fontStack: 'system',
        overlayBlur: 'small',
      })}>
        <ApolloProvider client={client}>
          { mounted && <Component {...pageProps} /> }
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
