import { useRouter } from "next/router";
import { useChain, useChainWallet, useChains, useWallet, useWalletClient } from "@cosmos-kit/react";
import { useEffect, useState } from "react";

import MyNftsView from "@/components/collections/MyNftsView";

export default function Home() {
    
    const router = useRouter();
    // const collectionAddr = router.query.addr;
    // const [collections, setCollections] = useState({collections: [], stakedCollections: []});
    // const { wallet, address, status } = useChain('juno');
    // const { getStargateClient, getCosmWasmClient } = useChain("juno");    
    // useEffect(() => {
    //     console.log(address);
    //     getCosmWasmClient().then((client) => {
    //     });
    // }, [address, getCosmWasmClient]);  

    return (
        <div>
            <MyNftsView  />
        </div>
    );
}
