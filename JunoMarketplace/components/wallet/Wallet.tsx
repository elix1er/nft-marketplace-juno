import {
  Box,
  Button,
  ClipboardCopyText,
  Stack,
  useColorModeValue,
} from "@interchain-ui/react";

import { Asset, AssetList } from "@chain-registry/types";

import { WalletStatus } from "cosmos-kit";
import { useChain, useChainWallet, useChains, useWallet, useWalletClient } from "@cosmos-kit/react";
import { getChainLogo } from "@/utils";
import { CHAIN_NAME } from "@/config";

import { User } from "./User";
import { Chain } from "./Chain";

import { Warning } from "./Warning";
import {
  ButtonConnect,
  ButtonConnected,
  ButtonConnecting,
  ButtonDisconnected,
  ButtonError,
  ButtonNotExist,
  ButtonRejected,
} from "./Connect";

import { JunoNftMarketplaceXMsgComposer } from '../../config/ts/a/JunoNftMarketplaceX.message-composer'
import { QueryMsg } from '../../config/ts/a/JunoNftMarketplaceX.types'

import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { assets } from "chain-registry";

const chainassets: AssetList = assets.find(
  (chain) => chain.chain_name === CHAIN_NAME
) as AssetList;

const coin: Asset = chainassets.assets.find(
  (asset) => asset.base === "ujuno"
) as Asset;

// const sendTokensX = (
//   getSigningStargateClient: () => Promise<SigningStargateClient>,
//   address: string
// ) => {
//   return async () => {
//   let signerClient = await getSigningStargateClient();
//   // signerClient.

//   let nftMarketComposer = new JunoNftMarketplaceXMsgComposer(address,'me');
//   let placeBidMsg = nftMarketComposer.placeBid({auctionId: "1"})

//   const fee: StdFee = {
//     amount: [
//       {
//         denom: coin.base,
//         amount: "1",
//       },
//     ],
//     gas: "86364",
//   };

//   signerClient.signAndBroadcast(address,[placeBidMsg],fee)
// }}

export function Wallet() {
  const {
    chain,
    status,
    wallet,
    username,
    address,
    message,
    // getSigningStargateClient,
    getSigningCosmWasmClient,
    connect,
    openView,
  } = useChain('juno');

  // const { getSigningCosmWasmClient } = useChainWallet('juno','keplr-extension')
  // let xooxa = new JunoNftMarketplaceMsgComposer(address,'asd');

  const ConnectButton = {
    [WalletStatus.Connected]: <ButtonConnected text={address?.substring(0,8)} onClick={openView} />,
    [WalletStatus.Connecting]: <ButtonConnecting />,
    [WalletStatus.Disconnected]: <ButtonDisconnected onClick={connect} />,
    [WalletStatus.Error]: <ButtonError onClick={openView} />,
    [WalletStatus.Rejected]: <ButtonRejected onClick={connect} />,
    [WalletStatus.NotExist]: <ButtonNotExist onClick={openView} />,
  }[status] || <ButtonConnect onClick={connect} />;

  return (
    <div>
        {/* <Chain
          name={chain.pretty_name}
          logo={getChainLogo(chain.chain_name)!}
        /> */}

        {/* {address ? <ClipboardCopyText text={address} truncate="middle" /> : null} */}
        {
          ConnectButton
        }

        { message && [WalletStatus.Error, WalletStatus.Rejected].includes(status)
          ? <Warning text={`${wallet?.prettyName}: ${message}`} />
          : null}
      {/* </Stack> */}
    </div>
  );
}
