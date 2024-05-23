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

function parseMultihash(payload: string) {
    if (payload) {
        const match = payload.match(/(?:ipfs:\/\/|\/ipfs\/)([a-zA-Z0-9]+)(.*)/);
        if (match) {
            return match[1] + match[2];
        }
    }
    return null;
}

async function fetchDataFromMultihash(multihash:string) {
    const url = `https://ipfs.daodao.zone/ipfs/${multihash}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Network response was not ok: ${response.statusText}`);
            return null;
        }
        const contentType = response.headers.get('Content-Type');

        if(contentType && contentType.includes('application/json')){
            // const data = await response.text();
            const data = await response.json(); // assuming the data is in JSON format
            return {contentType, data};
        } else {
            return {contentType, imageUrl: url};
        }
    } catch (error) {
        console.error('Fetching data failed:', error);
        return null; // {contentType: null, imageUrl: null};
    }
}
    
export default function MyNftsView(collections: any) {

    const router = useRouter();
    const collectionAddr = router.query.addr;
    const marketplaceAddr = 'juno144sv7x7rqv9q3fvwn8hwhnsjq3g4eugnazf5m5kr6hjw52aj7auq7s7uyf';

    const { wallet, address, status } = useChain('juno');
    const { getStargateClient, getCosmWasmClient } = useChain("juno");

    const [collectionsResolved, setCollectionsResolved] = useState([]);

    // let nftMarketComposer = new JunoNftMarketplaceMsgComposer(address,marketplaceAddr);
    
    useEffect(() => {
        console.log(address);
        getCosmWasmClient().then((client) => {
            collections.collections.forEach(  (collection: any) => {
                if(collection.tokens.length > 0)
                    client.queryContractSmart(collection.collectionAddress,  { nft_info: { token_id: collection.tokens[0] } }).then(async (response) => {
                        // console.log(response)
                        // if(response)
                        if (response && response.token_uri) {
                            try {
                                const multihash = parseMultihash(response.token_uri);
                                if (multihash) {
                                    collection.token_data = await fetchDataFromMultihash(multihash);
                                    setCollectionsResolved(collections);
                                    if (collection.token_data && collection.token_data.contentType && collection.token_data.contentType.startsWith('application/json')) {
                                        if (collection.token_data.data.image) {
                                            const hash = parseMultihash(collection.token_data.data.image);
                                            collection.token_data.imageUrl = `https://cloudflare-ipfs.com/ipfs/${hash}`;
                                        }
                                    }
                                } else {
                                    collection.token_data = null;
                                }
                            } catch (e) {
                                console.error('Error parsing JSON:', e);
                                collection.token_data = null;
                            }
                            // try {
                            //     token_uri_data = JSON.parse(token_uri_data as string); // Add type assertion here
                            //     collection.parsedMultihashJson = token_uri_data;
                            //     if(collection.parsedMultihashJson.image){
                            //         collection.imageUrl = collection.parsedMultihashJson.image;
                            //     }
                            // } catch (e) {
                            //     console.error('Error parsing JSON:', e);
                            //     collection.imageUrl = response.token_uri;
                            // }
                            // console.log({lfg:true, collection});
                        } else {
                            collection.token_data = null;
                        }

                    });
            });
        });
    }, [address, collections, getCosmWasmClient]);

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Juno NFTs</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                Found {collectionsResolved?.length} NFTs associated with your wallet, 
                while {collectionsResolved?.filter((f: { tokens: string | any[]; }) => f.tokens.length > 0).length} are available to be listed 
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {JSON.stringify(collectionsResolved)}
            {collectionsResolved?.filter((f: { tokens: string | any[]; }) => f.tokens.length > 0).map((col: any) => (
                <li key={col.collectionAddress}>
                { JSON.stringify(col) }
                <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={col.token_data?.imageUrl } alt="" />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{col.name}</h3>
                <p className="text-base text-sm leading-7 text-gray-600">{col.collectionAddress.substr(0,12) + '...'}</p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  <li>
                    <a href={col.xUrl} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">X</span>
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href={col.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">{col.collectionAddress}</span>
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  