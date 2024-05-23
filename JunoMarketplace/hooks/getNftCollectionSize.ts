import { useQuery } from 'react-query';
import axios from 'axios';

const fetchNFTs = async () => {
  const { data } = await axios.get('/api/nfts');
  return data;
};

export const useNFTs = () => {
  return useQuery('nfts', fetchNFTs);
};