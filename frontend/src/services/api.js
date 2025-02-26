// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response) {
//             console.error('Erro na resposta:', error.response);
//         }
//         return Promise.reject(error);
//         }
//     );


//     export default api;

import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
});

export default api;

const responseArtist = await api.get("/artists");
const responseSongs = await api.get("/songs");

export const artistArray = responseArtist.data;
export const songsArray = responseSongs.data;


console.log(artistArray);
console.log(songsArray);