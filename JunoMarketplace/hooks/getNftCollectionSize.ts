import axios from 'axios';

const fetchNFTs = async () => {
  const { data } = await axios.get('/api/nfts');
  return data;
};