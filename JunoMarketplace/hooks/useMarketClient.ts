'use client'

import { useEffect, useState } from 'react'
import { useChain } from '@cosmos-kit/react'
import { contracts } from '@/contracts/JMarketplace/index'
import {
  JMarketplaceClient,
  JMarketplaceQueryClient,
} from '@/contracts/JMarketplace/JMarketplace.client'

import { CHAIN_MARKETPLACE_ADDRESS, CHAIN_NAME} from '@/config/defaults'

export const useMarketplaceClient = (address?: string) => {

  const [jMarketplaceClient, setJMarketplaceClient] = useState<JMarketplaceClient>()
  const [jMarketplaceQueryClient, setJMarketplaceQueryClient] = useState<JMarketplaceQueryClient>()

  const { getCosmWasmClient, getSigningCosmWasmClient } =
    useChain(CHAIN_NAME)

  useEffect(() => {
    if (address) {
      const init = async () => {

        const cosmWasmSigningClient = await getSigningCosmWasmClient()
        const cosmWasmClient = await getCosmWasmClient()

        const client = new contracts.JMarketplace.JMarketplaceClient(
          cosmWasmSigningClient as any,
          address,
          CHAIN_MARKETPLACE_ADDRESS
        )
        const queryClient = new contracts.JMarketplace.JMarketplaceQueryClient(
          cosmWasmClient as any,
          CHAIN_MARKETPLACE_ADDRESS
        )

        setJMarketplaceClient(client)
        setJMarketplaceQueryClient(queryClient)
      }

      init()
    }
  }, [address, getCosmWasmClient, getSigningCosmWasmClient])

  return { jMarketplaceClient, jMarketplaceQueryClient }
}
