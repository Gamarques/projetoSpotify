import axios from "axios";

const cache = {};

const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    if (config.method === 'get') { // Cache apenas para requisições GET por simplicidade
      const cachedData = cache[config.url];
      if (cachedData) {
        console.log(`[Cache] Dados encontrados em cache para URL: ${config.url}`);
        return { ...config, data: cachedData, cached: true }; // Retorna dados do cache e indica que é cached
      }
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
      if (response.config.method === 'get' && !response.config.cached) { // Armazena em cache apenas se não veio do cache
        console.log(`[Cache] Armazenando dados em cache para URL: ${response.config.url}`);
        cache[response.config.url] = response.data;
      }
      return response;
    },
    (error) => {
      console.error("Erro na requisição:", error);
      return Promise.reject(error);
    }
);
  


export default api;

const responseArtist = await api.get("/artists");
const responseSongs = await api.get("/songs");

export const artistArray = responseArtist.data;
export const songsArray = responseSongs.data;


console.log(artistArray);
console.log(songsArray);