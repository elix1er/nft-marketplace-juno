import { Divider } from "@interchain-ui/react";
import { useRouter } from "next/router";
import { LayoutBase, Wallet } from "@/components";
import { ExploreCollections, DetailView } from "@/components";
import { useChain, useChainWallet, useChains, useWallet, useWalletClient } from "@cosmos-kit/react";

import { useJunoNftMarketplaceXStateQuery } from '@/config/ts/a/JunoNftMarketplaceX.react-query'
import { JunoNftMarketplaceXQueryClient } from '@/config/ts/a/JunoNftMarketplaceX.client'
import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { JunoNftMarketplaceMsgComposer } from "@/config/ts/b/JunoNftMarketplace.message-composer";
import { useEffect } from "react";

// import { TokensQuery,  } from "@/config/721";
export default function Home() {
    
    const router = useRouter();
    const collectionAddr = router.query.addr;
    const marketplaceAddr = 'juno144sv7x7rqv9q3fvwn8hwhnsjq3g4eugnazf5m5kr6hjw52aj7auq7s7uyf';

    const {wallet, address, status} = useChain('juno');
    const { getStargateClient, getCosmWasmClient } = useChain("juno");

    // let nftMarketComposer = new JunoNftMarketplaceMsgComposer(address,marketplaceAddr);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const client = await getCosmWasmClient();
                const response = await fetch("https://indexer.daodao.zone/batch", {
                    headers: {
                        "accept": "*/*",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify([`/juno-1/wallet/${address}/nft/collections?`]),
                    method: "POST",
                });

                const data = await response.json();
                const collections = JSON.parse(data[0].body);

                for (const collection of collections) {
                    if (collection) {
                        const response = await client.queryContractSmart(collection.collectionAddress, { num_tokens: {} });
                        console.log(response);
                    }
                }
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };

        if (address) {
            fetchCollections();
        }
    }, [address, getCosmWasmClient]);


    return (
        <LayoutBase>
            {/* <Wallet /> */}
            {/* <Divider mb="$16" /> */}
            <ExploreCollections />
        </LayoutBase>
    );
}
