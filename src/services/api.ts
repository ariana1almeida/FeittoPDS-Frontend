import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("authData");
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Erro ao fazer parse do authData:', error);
    }
  }
  return config;
});