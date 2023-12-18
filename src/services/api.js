import axios from "axios";

// Base da URL: https://api.themoviedb.org/3
// URL DA API: /movie/now_playing?api_key=b514e947d353222bc96363f835bc2027&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

export default api