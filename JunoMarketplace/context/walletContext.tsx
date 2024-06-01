import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useChain } from "@cosmos-kit/react";
import { CHAIN_NAME } from '@/config/defaults'
import { JMarketplaceClient, JMarketplaceQueryClient } from "@/contracts/JMarketplace/JMarketplace.client";
import { useMarketplaceClient } from "@/hooks/useMarketClient";
import { Wallet } from "@cosmos-kit/core";

interface WalletState {
  balance: { status: 'loading' | 'success'; data?: string }
  address?: string
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

  const { jMarketplaceClient, jMarketplaceQueryClient } = useMarketplaceClient(address)

  const getBalance = async (walletAddress: string) => {
    const account = await getCosmWasmClient()
    const uJunoBalance = await account.getBalance(walletAddress, 'ujuno')
    return uJunoBalance.amount;
  }

  const init = async (walletAddress: string) => {
    const walletBalance = await getBalance(walletAddress)
    setBalance({ status: 'success', data: walletBalance })
  }

  useEffect(() => {
    if (isWalletConnected && address) {
      init(address)
    }
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
      isWalletConnected,
      isWalletConnecting,
      jMarketplaceClient,
      jMarketplaceQueryClient,
      connectWallet: handleConnectWallet,
      disconnectWallet: handleDisconnectWallet,
    }),
    [
      address,
      balance,
      wallet,
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
