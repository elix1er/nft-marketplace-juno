import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useChain } from "@cosmos-kit/react";
import { StdFee } from "@cosmjs/stargate";
import { LayoutBase, ExploreCollection } from "@/components";
import { useWalletContext } from "@/context/walletContext";
import { CHAIN_MARKETPLACE_ADDRESS, CHAIN_NAME } from "@/config/defaults";

// import { JMarketplaceMsgComposer } from "@/contracts/JMarketplace/JMarketplace.message-composer";

const fee: StdFee = {
  amount: [
    {
      denom: "ujuno",
      amount: "1",
    },
  ],
  gas: "526432", // TODO: make this dynamic. high gas like this for auction settlement. normally lower.
};

export default function CollectionView() {

  const router = useRouter();
  const { addr } = router.query;

  const {
    wallet,
    address,
    balance,
    jMarketplaceClient,
    jMarketplaceQueryClient,
  } = useWalletContext();

  const [configResult, setConfigResult] = useState<any>(null);
  // TODO: set/get this for a single NFT auction, not in collection overview
  const [bidHistory, setBidHistory] = useState<any>(null); 

  useEffect(() => {
    const fetchData = async () => {
      if (jMarketplaceClient && address) {
        const config = await jMarketplaceClient.config(); // reading contract state from maretplace contract
        const bidHistoryByAuctionId = await jMarketplaceClient.bidHistoryByAuctionId({auctionId:"2" }); // reading contract state from maretplace contract
        
        setConfigResult(config);
        console.table(config);

        setBidHistory(bidHistoryByAuctionId);
        console.table(bidHistoryByAuctionId);

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
      {/* {JSON.stringify({ wallet, address, balance }, null, 2)}
      <pre>{JSON.stringify(configResult, null, 2)}</pre> */}
      <ExploreCollection  />
    </>
  );
}
