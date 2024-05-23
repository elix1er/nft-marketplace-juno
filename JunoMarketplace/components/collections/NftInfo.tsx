import React from 'react';

interface NftInfoProps {
  title: string;
  owner: string;
  isListed: boolean;
}

const NftInfo: React.FC<NftInfoProps> = ({ title, owner, isListed }) => {
  return (
    <div >
      <div className="rounded-lg mb-6">
        <h1 className="text-3xl font-extrabold text-white">{title}</h1>
        <p className="text-gray-400 mt-2">Owned by</p>
        <p className="break-words text-sm text-gray-400 mt-1">{owner}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">{isListed ? 'LISTED' : 'NOT LISTED'}</h2>
      </div>
    </div>
  );
};

export default NftInfo;