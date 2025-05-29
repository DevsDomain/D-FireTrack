// src/services/index.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.x.x:3333", // IP da sua máquina na rede local
});

export const buscarImagens = async (
  collection: string,
  bbox?: string,
  datetime?: string,
  limit: number = 10
) => {
  const params: any = { collection, limit };
  if (bbox) params.bbox = bbox;
  if (datetime) params.datetime = datetime;

  const response = await api.get("/search", { params });
  return response.data.features;
};

export default api;