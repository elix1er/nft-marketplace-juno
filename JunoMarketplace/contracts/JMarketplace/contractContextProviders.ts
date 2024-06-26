/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { IQueryClientProvider, ISigningClientProvider, IMessageComposerProvider } from "./contractContextBase";
import { JMarketplaceQueryClient } from "./JMarketplace.client";
import { JMarketplaceClient } from "./JMarketplace.client";
import { JMarketplaceMsgComposer } from "./JMarketplace.message-composer";
import { JMarketplace } from "./JMarketplace.provider";
export interface IContractsContext {
  jMarketplace: IQueryClientProvider<JMarketplaceQueryClient> & ISigningClientProvider<JMarketplaceClient> & IMessageComposerProvider<JMarketplaceMsgComposer>;
}
export const getProviders = (address?: string, cosmWasmClient?: CosmWasmClient, signingCosmWasmClient?: SigningCosmWasmClient) => ({
  jMarketplace: new JMarketplace({
    address,
    cosmWasmClient,
    signingCosmWasmClient
  })
});