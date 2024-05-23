import { useRouter } from "next/router";
import { Divider } from "@interchain-ui/react";
import { LayoutBase, Wallet } from "@/components";
import { ExploreCollections, DetailView } from "@/components";

export default function Home() {
    const router = useRouter();
    const { addr, nftId } = router.query;
    console.log("addr", addr);
    
    return (
        <LayoutBase>
            {/* <Wallet /> */}
            {/* <Divider mb="$16" /> */}
            <DetailView />
            {/* <Divider mb="$16" /> */}
            {/* <ExploreCollections/> */}
        </LayoutBase>
    );
}
