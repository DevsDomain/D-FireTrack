// src/services/index.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333", // ajuste se a API rodar em outra porta
});

// Busca imagens com base nos parâmetros fornecidos
export const buscarImagens = async (
  collection: string,
  bbox?: string,
  datetime?: string,
  limit: number = 100
) => {
  const params: any = { collection, limit };
  if (bbox) params.bbox = bbox;
  if (datetime) params.datetime = datetime;

  const response = await api.get("/search", { params });
  return response.data.features;
};

export default api;
