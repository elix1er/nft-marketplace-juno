import Head from "next/head";
import TailwindUiNavBar from "./NavBar";
import WebGLBackground from "./WebGLBackground";
import TheeWaveComponent from "./VaporWave";
import VaporWaveView from "./VaporWave";

import { Footer } from "./Footer";

export function LayoutBase({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <Head>
        <title>Juno NFT Marketplace MVP</title>
        <meta name="description" content="By Moon Tech Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        /* 
          <ContractsProvider contractsConfig={{
            address: context.address,
            getCosmWasmClient: context.getCosmWasmClient,
            getSigningCosmWasmClient: context.getSigningCosmWasmClient,
          }}> 

        */
      }

      <TailwindUiNavBar />
      {/* <VaporWaveView /> */}
      { children }  

      {/* <Header /> */}
      {/* <WebGLBackground/>  */}
      
      <Footer />
      {/* </ContractsProvider> */}
    </div>
  );
}
