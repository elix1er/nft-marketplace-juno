import { useRouter } from "next/router";
import { DetailView } from "@/components";
import { useWalletContext } from "@/context/walletContext";
import { useEffect, useState } from "react";

export default function SingleNftView() {
    const router = useRouter();
    
    const { addr, nftId } = router.query;
    console.log("addr", addr, "nftId", nftId);

    const {
        wallet,
        address,
        balance,
        jMarketplaceClient,
        jMarketplaceQueryClient,
    } = useWalletContext();

    // Marketplace Contract State Configuration 
    const [configResult, setConfigResult] = useState<any>(null);
    // TODO: set/get this for a single NFT auction, not in collection overview
    const [auctionByContract, setAuctionByContract] = useState<any>(null); 
  
    useEffect(() => {
      const fetchData = async () => {
        if (jMarketplaceClient && address && addr) {
          const config = await jMarketplaceClient.config(); // reading contract state from maretplace contract
          setConfigResult(config);
          console.table(config);

          const auctionByContract = await jMarketplaceClient.auctionByContract({nftContract: addr.toString()});
          console.table(auctionByContract);
  
          setAuctionByContract(auctionByContract);
  
          // const blabla =  await jMarketplaceClient.placeBid({auctionId:"2"},fee,'token1zin', [{denom: "ujuno", amount: "1337000"}]);
          // const blabla = await jMarketplaceClient.settle({auctionId:"2"},fee);
  
              // manually craft a message, leave for now as a reference
          
          // let myEncoder = new JMarketplaceMsgComposer(address, 'juno144sv7x7rqv9q3fvwn8hwhnsjq3g4eugnazf5m5kr6hjw52aj7auq7s7uyf');
          // myEncoder.placeBid({auctionId: "2"}, [{denom: "ujuno", amount: "1000000"}])
  
        }
      };
      fetchData();
    }, [jMarketplaceClient]);

    return (
        <>
            <DetailView />
        </>
    );
}
