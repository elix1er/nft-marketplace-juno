import { Divider } from "@interchain-ui/react";
import { useRouter } from "next/router";
import { LayoutBase, Wallet } from "@/components";
import { ExploreCollections, DetailView } from "@/components";
import { CHAIN_MARKETPLACE_ADDRESS } from "@/config";
import { useChain, useChainWallet, useChains, useWallet, useWalletClient } from "@cosmos-kit/react";


import { useJunoNftMarketplaceXNotStartedAuctionQuery, useJunoNftMarketplaceXAuctionQuery, useJunoNftMarketplaceXAuctionByContractQuery, useJunoNftMarketplaceXStateQuery } from '@/config/ts/a/JunoNftMarketplaceX.react-query'
import { contracts } from '@/config/ts/a/index'
import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { JunoNftMarketplaceMsgComposer } from "@/config/ts/b/JunoNftMarketplace.message-composer";
import { JunoNftMarketplaceClient } from "@/config/ts/b/JunoNftMarketplace.client";

const { JunoNftMarketplaceXClient, JunoNftMarketplaceXMsgComposer, JunoNftMarketplaceXQueryClient } = contracts.JunoNftMarketplaceX;


import { useEffect } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// import { TokensQuery,  } from "@/config/721";
export default function Home() {
    
    const router = useRouter();
    const collectionAddr = router.query.addr;

    const { wallet, address} = useChain('juno');
    const { getCosmWasmClient, getStargateClient } = useChain("juno");


    useEffect(() => {
        // getCosmWasmClient().then((client: CosmWasmClient) => {

        //     const junoClient = new JunoNftMarketplaceXQueryClient(client, CHAIN_MARKETPLACE_ADDRESS);
        //     const { data } = useJunoNftMarketplaceXStateQuery({ client: junoClient });
        //     console.log(data);

        // });


        // const fetchCollections = async () => {
            try {

                //     const junoClient = new JunoNftMarketplaceXQueryClient(client, CHAIN_MARKETPLACE_ADDRESS);
                //     const { data } = useJunoNftMarketplaceXAuctionByContractQuery({ client: junoClient, contract: collectionAddr });
                //     console.log(data);
                // });

                // if (address) {
                //     let nftMarketComposer = new JunoNftMarketplaceMsgComposer(address, CHAIN_MARKETPLACE_ADDRESS);
                //     const { data } = useJunoNftMarketplaceXAuctionQuery({ client: junoClient });

                    // nftMarketComposer.
                // }

    //             const response = await fetch("https://indexer.daodao.zone/batch", {
    //                 headers: {
    //                     "accept": "*/*",
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify([`/juno-1/wallet/${address}/nft/collections?`]),
    //                 method: "POST",
    //             });

    //             const data = await response.json();
    //             const collections = JSON.parse(data[0].body);

    //             for (const collection of collections) {
    //                 if (collection) {
    //                     const response = await client.queryContractSmart(collection.collectionAddress, { num_tokens: {} });
    //                     console.log(response);
    //                 }
    //             }
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        // };

        // if (address) {
        //     fetchCollections();
        // }
    }, [address, getCosmWasmClient]);


    return (
        <LayoutBase>
            {/* <Wallet /> */}
            {/* <Divider mb="$16" /> */}
            <ExploreCollections />
        </LayoutBase>
    );
}
