import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUser,
  faCog,
  faThLarge,
  faFilter,
  faCheckCircle,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export function ExploreCollections() {

// collections, true, collectionLoader
  // fetch("https://indexer.daodao.zone/batch", {
  //   "headers": {
  //     "accept": "*/*",
  //     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //     "content-type": "application/json",
  //     "priority": "u=1, i",
  //     "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"macOS\"",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-site"
  //   },
  //     "referrer": "https://daodao.zone/",
  //     "referrerPolicy": "strict-origin-when-cross-origin",
  //     "body": "[\"/juno-1/wallet/juno1337gu8scfdfckj5xvk8k9dm79zss0ehg6gl9z7/nft/collections?\",\"/migaloo-1/wallet/migaloo1337gu8scfdfckj5xvk8k9dm79zss0ehgpw4ysv/nft/collections?\",\"/neutron-1/wallet/neutron1337gu8scfdfckj5xvk8k9dm79zss0ehgg94ul9/nft/collections?\",\"/Oraichain/wallet/orai1337gu8scfdfckj5xvk8k9dm79zss0ehglf2ay3/nft/collections?\",\"/osmosis-1/wallet/osmo1337gu8scfdfckj5xvk8k9dm79zss0ehgyp0wns/nft/collections?\"]",
  //     "method": "POST",
  //     "mode": "cors",
  //     "credentials": "omit"
  // });


  // Additional handlers and logic would go here

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faBars} className="text-xl" />
          <span className="ml-4 text-lg">AllianceDAO</span>
        </div>
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faSearch} className="text-xl" />
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <FontAwesomeIcon icon={faCog} className="text-xl" />
        </div>
      </nav>

      {/* Header */}
      <header className="relative">
        <img
          src="https://placehold.co/1600x400"
          alt="Header image of abstract art with vibrant colors"
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-20 left-10 flex items-center">
          <img
            src="https://placehold.co/80"
            alt="AllianceDAO logo"
            className="rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">
              AllianceDAO NFT{" "}
              {/* <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
              <FontAwesomeIcon icon={faGlobe} className="text-blue-500" /> */}
            </h1>
            {/* <p className="text-gray-400">AllianceDAO</p> */}
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="flex justify-around bg-gray-800 p-4">
        <div className="text-center">
          <p className="text-gray-400">Floor Price</p>
          <p className="font-bold">119 JUNO</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Total Volume</p>
          <p className="font-bold">167860 JUNO</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Last Sale</p>
          <p className="font-bold">125 JUNO</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Total Supply</p>
          <p className="font-bold">10000 NFTs</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search NFT"
              className="w-64 p-2 pl-8 rounded bg-gray-800 border border-gray-700 text-white"
            />
            {/* <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-2 top-2.5 text-gray-500"
            /> */}
          </div>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faThLarge} className="text-xl" />
            <FontAwesomeIcon icon={faFilter} className="text-xl" />
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-2 rounded">
            <img
              src="https://placehold.co/400"
              alt="NFT image of a character in a desert landscape"
              className="rounded"
            />
            <p className="text-center mt-2">AllianceDAO NFT #{i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
