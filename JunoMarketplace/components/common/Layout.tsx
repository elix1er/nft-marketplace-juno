import Head from "next/head";

import { Footer } from "./Footer";

import WebGLBackground from "./WebGLBackground";
import TheeWaveComponent from "./VaporWave";
import TailwindUiNavBar from "./NavBar";
import VaporWaveView from "./VaporWave";


export function LayoutBase({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Juno NFT Marketplace MVP</title>
        <meta name="description" content="By Moon Tech Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TailwindUiNavBar />

      { children }

      {/* <Header /> */}
      <VaporWaveView />
      {/* <WebGLBackground/>  */}
      <Footer />
    </div>
  );
}
