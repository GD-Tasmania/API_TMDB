import axios from 'axios'

const API_KEY = "5e0199a60e32582860753e9dbd8af0f9"; // KEY
const BASE_URL = "https://api.themoviedb.org/3"; // URL API

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "es-ES",
  },
})

export { api }