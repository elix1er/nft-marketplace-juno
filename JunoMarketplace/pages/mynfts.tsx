import { useRouter } from "next/router";
import { useChain, useChainWallet, useChains, useWallet, useWalletClient } from "@cosmos-kit/react";
import { useEffect, useState } from "react";

import MyNftsView from "@/components/collections/MyNftsView";

export default function Home() {
    
    const router = useRouter();
    const collectionAddr = router.query.addr;
    const [collections, setCollections] = useState({collections: [], stakedCollections: []});

    const { wallet, address, status } = useChain('juno');
    const { getStargateClient, getCosmWasmClient } = useChain("juno");    
    
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
                
                setCollections({collections: dataCollections, stakedCollections: dataCollectionsStaked});
                setCollections(dataCollections);

                console.log('DAODAO Indexer Response', dataCollectionsStaked);
            });
        });
    }, [address, getCosmWasmClient]);  

    return (
        <div>
            <MyNftsView collections={collections} />
        </div>
    );
}
