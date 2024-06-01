import "../styles/globals.css";
import "@interchain-ui/react/styles";

import type { AppProps } from "next/app";
import { SignerOptions } from "@cosmos-kit/core";
import { wallets as keplrWallets } from '@cosmos-kit/keplr';
// import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation';
import { wallets as leapWallets } from '@cosmos-kit/leap';
import { ChainProvider, useChain, walletContext } from "@cosmos-kit/react";

import { assets, chains } from 'chain-registry'
import { getSigningCosmosClientOptions } from 'interchain'

import {
  ThemeProvider,
} from "@interchain-ui/react";

import { Chain } from '@chain-registry/types'
import { GasPrice } from '@cosmjs/stargate'
import { wallets } from "cosmos-kit";
import { CHAIN_MARKETPLACE_ADDRESS} from '@/config/defaults'
import { LayoutBase } from "@/components";
import { WalletProvider } from "@/context/walletContext";

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  
  // const { themeClass } = useTheme()
  const signerOptions: SignerOptions = {
    // @ts-ignore
    signingStargate: (_chain: Chain) => {
      return getSigningCosmosClientOptions()
    },
  }
  
  return (
    <ThemeProvider defaultTheme={"light"}>
      <ChainProvider
        endpointOptions={{
          endpoints: {
            juno: {
              isLazy: true,
              rpc: ['https://juno-rpc.polkachu.com']
            }
          }
        }}
        chains={chains.filter((f) => f.chain_name=='juno')}
        assetLists={assets}
        wallets={[...keplrWallets, ...leapWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "SkillDex DAO NFT Marketplace",
              description: "SkillDex DAO NFT Marketplace",
              url: "https://x.com/skilldexzone",
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        {/* TODO fix type error */}
        <WalletProvider>
          <LayoutBase>
            <Component {...pageProps} />
          </LayoutBase>
        </WalletProvider>
      </ChainProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
