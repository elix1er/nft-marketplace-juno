import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useChain } from "@cosmos-kit/react";
import { CHAIN_NAME } from '@/config/defaults'
import { JMarketplaceClient, JMarketplaceQueryClient } from "@/contracts/JMarketplace/JMarketplace.client";
import { useMarketplaceClient } from "@/hooks/useMarketClient";
import { Wallet } from "@cosmos-kit/core";

interface IndexerResponse {
  collectionAddress:string,
  tokens: []
}

interface WalletState {
  address?: string
  balance: { status: 'loading' | 'success'; data?: string }
  collections: { status: 'loading' | 'success'; data?: [IndexerResponse] },
  collectionsStaked: { status: 'loading' | 'success'; data?: [IndexerResponse] },
  isWalletConnected: boolean
  isWalletConnecting: boolean
  wallet?: Wallet
  jMarketplaceClient?: JMarketplaceClient
  jMarketplaceQueryClient?: JMarketplaceQueryClient
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
}

export const WalletContext = createContext<WalletState>({
  address: undefined,
  balance: { status: 'loading', data: undefined },
  collections: { status: 'loading', data: undefined },
  collectionsStaked: { status: 'loading', data: undefined },
  isWalletConnected: false,
  isWalletConnecting: false,
  jMarketplaceClient: undefined,
  jMarketplaceQueryClient: undefined,
  connectWallet: async () => {
    throw new Error('Please connect your wallet')
  },
  disconnectWallet: async () => {
    throw new Error('Please connect your wallet')
  },
})

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    connect,
    disconnect,
    wallet,
    address,
    isWalletConnected,
    isWalletConnecting,
    getCosmWasmClient,
  } = useChain(CHAIN_NAME)

  const [balance, setBalance] = useState<WalletState['balance']>({
    status: 'loading',
    data: undefined,
  })

  const [collections, setCollections] = useState<WalletState['collections']>({status: 'loading', data: undefined});
  const [collectionsStaked, setCollectionsState] = useState<WalletState['collectionsStaked']>({status: 'loading', data: undefined});

  const { jMarketplaceClient, jMarketplaceQueryClient } = useMarketplaceClient(address)

  const getJunoWalletNfts = async (walletAddress: string) => {
    // const cwClient = await getCosmWasmClient();
    // try{
      let res = await fetch("https://indexer.daodao.zone/batch", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "content-type": "application/json",
            "priority": "u=1, i",
        },
        "referrer": "https://daodao.zone/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify([
            "/juno-1/wallet/" + walletAddress + "/nft/collections?",
            "/juno-1/wallet/" + walletAddress + "/nft/stakedWithDaos?",
        ]),
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
        })

        let data = await res.json();
        // console.log(data);
        let dataCollections = JSON.parse(data[0].body);
        let dataCollectionsStaked = JSON.parse(data[1].body);
        console.log('DAODAO Indexer Response', ((data.map((d: any) => JSON.parse(d.body)))));
        return { collections: dataCollections, stakedCollections: dataCollectionsStaked };
        
      // } catch(e) {
      //   // setCollections([]);
      //   // setStakedCollections([]);
      //   console.error(e);
      //   return { collections: [], stakedCollections: [] };
      // }
      // return { collections: [], stakedCollections: [] };
  }

  const getBalance = async (walletAddress: string) => {
    const cwClient = await getCosmWasmClient()
    const uJunoBalance = await cwClient.getBalance(walletAddress, 'ujuno')
    return uJunoBalance.amount;
  }

  const init = async (walletAddress: string) => {
    const walletBalance = await getBalance(walletAddress)
    const walletNfts = await getJunoWalletNfts(walletAddress)

    // console.log({ walletNfts})
    setCollections({ status: 'success', data: walletNfts.collections })
    setCollectionsState({ status: 'success', data: walletNfts.stakedCollections })
    setBalance({ status: 'success', data: walletBalance })
  }

  useEffect(() => {
    if (isWalletConnected && address) {
      init(address)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isWalletConnected])


  const handleConnectWallet = async () => {
    await connect()
  }

  const handleDisconnectWallet = async () => {
    await disconnect()
    setBalance({ status: 'loading', data: undefined })
  }

  const contextValue: WalletState = useMemo(
    () => ({
      address,
      balance,
      wallet,
      collections,
      collectionsStaked,    
      isWalletConnected,
      isWalletConnecting,
      jMarketplaceClient,
      jMarketplaceQueryClient,
      connectWallet: handleConnectWallet,
      disconnectWallet: handleDisconnectWallet,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      address,
      balance,
      wallet,
      collections,
      collectionsStaked,   
      isWalletConnected,
      isWalletConnecting,
      jMarketplaceClient,
      jMarketplaceQueryClient,
    ]
  )

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => useContext(WalletContext)
