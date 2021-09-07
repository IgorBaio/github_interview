import axios from "axios";

const BASE_URL = 'https://api.github.com/users/'

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(async (config) => {
  return config;
});

export default client;
