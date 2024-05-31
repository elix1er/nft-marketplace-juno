import "../styles/globals.css";
import "@interchain-ui/react/styles";

import type { AppProps } from "next/app";
import { SignerOptions } from "@cosmos-kit/core";
import { wallets as keplrWallets } from "@cosmos-kit/keplr-extension";
import { wallets as leapWallets } from "@cosmos-kit/leap-extension";

import { ChainProvider, useChain, walletContext } from "@cosmos-kit/react";

import { assets, chains } from 'chain-registry'
import { getSigningCosmosClientOptions } from 'interchain'

import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from "@interchain-ui/react";

import { Chain } from '@chain-registry/types'
import { GasPrice } from '@cosmjs/stargate'
import { juno } from "juno-network";
import { wallets } from "cosmos-kit";
import { ContractsProvider } from "@/contracts/JMarketplace/contracts-context";

import { CHAIN_MARKETPLACE_ADDRESS} from '@/config/defaults'
function CreateCosmosApp({ Component, pageProps }: AppProps) {
  
  const { themeClass } = useTheme();
  const signerOptions: SignerOptions = {
    // @ts-ignore
    signingStargate: (_chain: Chain) => {
      return getSigningCosmosClientOptions()
    },
    // signingCosmwasm: (chain: Chain) => {
    //   // non-ibc fee token
    //   const feeToken = chain.fees?.fee_tokens?.find((token) => !token.denom.startsWith('ibc/'))
    //   if (feeToken) {
    //     return {
    //       gasPrice: GasPrice.fromString('0.0025' + feeToken.denom),
    //     }
    //   }
    // },
  }
  
  return (
    <ThemeProvider>
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
        wallets={wallets}
        
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
        // @ts-ignore
        signerOptions={signerOptions}
      >
        
          {/* TODO fix type error */}
          <Component {...pageProps} />

      </ChainProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
