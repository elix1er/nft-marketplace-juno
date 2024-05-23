/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import NftInfo from "./NftInfo";


export const TraitsView = ({ traits }: { traits: { category: string, value: string }[] }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold text-white mb-4">Traits</h3>
            <div className="grid grid-cols-2 gap-4">
                {traits.map((trait, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded outline outline-1 outline-gray-700 shadow-md">
                        <p className="text-xs text-gray-400">{trait.category}</p>
                        <p className="font-semibold text-lg text-white">{trait.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const DetailView = () => {

    const pages = [
        { name: "Collections", href: "#", current: false },
        { name: "Mad Scientists", href: "#", current: false },
        { name: "Mad Scientist #1", href: "#", current: true },
      ];
      

    const traitsData = [
        { category: 'Eyes & Eyewear', value: 'NBK' },
        { category: 'Outfit', value: 'Diagonal' },
        { category: 'Origin', value: 'Chalk' },
        { category: 'Background', value: 'Oceanographer' },
        { category: 'Head & Headwear', value: 'Intellectual' },
        { category: 'Mouth', value: 'Haircomb Stache' },
    ];
        
  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      <div className="container mx-auto p-4">
        <div className=" flex items-start">
          {/* Left Section */}
          <div className="flex-1">
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className=" flex items-center space-x-4">
                <li>
                  <div>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <HomeIcon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
                {pages.map((page) => (
                  <li key={page.name}>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <a
                        href={page.href}
                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                        aria-current={page.current ? "page" : undefined}
                      >
                        {page.name}
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
            {/* <div className="mt-4 flex items-center">
              <i className="fas fa-eye text-gray-500"></i>
              <span className="ml-2">6829</span>
            </div> */}
            <div className="mt-4">
              <img
                src="https://ipfs.realityflux.io/ipfs/QmZgXpkU9oRrQGr5muz4DD8trr4F3rechcS9nkC5z7ue7e/?pinataGatewayToken=B9zzwsO_1qJRcH8Ki5NU0senaMF1a_De5Ib-PVeu9KUcY6Z0QhLgLkHq018_lF7e"
                alt="Pixel art of Mad Scientist with glasses, green hair, white coat, and underwater background"
                className="w-full"
              />
            </div>
          </div>

          {/* Right Section */}
            <div className="ml-8 mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <NftInfo
                title="Mad Scientist #1"
                owner="juno10vzkd8pyme67z38epdr3gf027y03dxq78tvausfp3r28vkks7mwse02j8f"
                isListed={false}
            />
            <TraitsView traits={traitsData}/>
        </div>

        </div>
      </div>
    </div>
  );
};

export default DetailView;
