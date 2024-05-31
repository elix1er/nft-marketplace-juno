import Head from "next/head";


import WebGLBackground from "./WebGLBackground";
import TheeWaveComponent from "./VaporWave";
import TailwindUiNavBar from "./NavBar";
import VaporWaveView from "./VaporWave";
import { useChain } from "@cosmos-kit/react";
import { Footer } from "./Footer";
import { ContractsProvider } from "@/contracts/JMarketplace/contracts-context";
import { CHAIN_MARKETPLACE_ADDRESS, CHAIN_NAME } from '@/config/defaults'

export function LayoutBase({ children }: { children: React.ReactNode }) {
 
  const {
    address,
    getCosmWasmClient,
    getSigningCosmWasmClient
  } = useChain(CHAIN_NAME);

  return (
    <div>
      <Head>
        <title>Juno NFT Marketplace MVP</title>
        <meta name="description" content="By Moon Tech Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContractsProvider contractsConfig={{address: CHAIN_MARKETPLACE_ADDRESS, getCosmWasmClient, getSigningCosmWasmClient }}>
        <TailwindUiNavBar />

        {/* <VaporWaveView /> */}
        
        { children }

        {/* <Header /> */}
        {/* <WebGLBackground/>  */}
        
        <Footer />
      </ContractsProvider>
    </div>
  );
}
