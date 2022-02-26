import axios from 'axios';

// Insira aqui sua api_key
const apiKey = 'YOUR_API_KEY_HERE';

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params:{
    api_key: apiKey,
  }
});
