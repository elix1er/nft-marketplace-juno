import { useRouter } from "next/router";
import { Divider } from "@interchain-ui/react";
import { LayoutBase, Wallet } from "@/components";
import { ExploreCollections, DetailView } from "@/components";
import { useChain, useChainWallet, useChains, useWallet, useWalletClient } from "@cosmos-kit/react";
import { useJunoNftMarketplaceXStateQuery } from '@/config/ts/a/JunoNftMarketplaceX.react-query'
import { JunoNftMarketplaceXQueryClient } from '@/config/ts/a/JunoNftMarketplaceX.client'
import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { useEffect, useState } from "react";

import { JunoNftMarketplaceXMsgComposer } from "@/config/ts/a/JunoNftMarketplaceX.message-composer";
import MyNftsView from "@/components/collections/MyNftsView";

export default function Home() {
    
    const router = useRouter();
    const collectionAddr = router.query.addr;
    const marketplaceAddr = 'juno144sv7x7rqv9q3fvwn8hwhnsjq3g4eugnazf5m5kr6hjw52aj7auq7s7uyf';

    const [collections, setCollections] = useState<any[]>([]);

    const { wallet, address, status } = useChain('juno');
    const { getStargateClient, getCosmWasmClient } = useChain("juno");
    
    // let nftMarketComposer = new JunoNftMarketplaceMsgComposer(address,marketplaceAddr);
    
    
    useEffect(() => {

        console.log(address);
        getCosmWasmClient().then((client) => {

            fetch("https://indexer.daodao.zone/batch", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/json",
                    "priority": "u=1, i",
                },
                "referrer": "https://daodao.zone/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify([
                    "/juno-1/wallet/" + address + "/nft/collections?",
                    "/juno-1/wallet/" + address + "/nft/stakedWithDaos?",
                ]),
                "method": "POST",
                "mode": "cors",
                "credentials": "omit"
            }).then((response) => {
                return response.json();
            }).then((data) => {
                let dataCollections = JSON.parse(data[0].body);
                let dataCollectionsStaked = JSON.parse(data[1].body);

                setCollections([...dataCollections, ...dataCollectionsStaked]);

                console.log('00000000-------');
                // setCollections(JSON.parse(data[0].body));
                // JSON.parse(data[0].body).forEach((collection: any) => {
                    // console.log(JSON.parse(data[0].body));
                    // if(collection)

                // });
            });
        });
    }, [address, getCosmWasmClient]);  

    return (
        <LayoutBase>
            <div>
                <MyNftsView collections={collections} />
            </div>
            {/* <Wallet /> */}
            {/* <Divider mb="$16" /> */}
            {/* <ExploreCollections /> */}
        </LayoutBase>
    );
}
