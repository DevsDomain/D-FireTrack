// services/fetchSchedule.ts
import axios from 'axios';

export const FetchSchedule = async (id: string) => {
  try {
    const response = await axios.post('http://localhost:3333/api/apontamento/filtro', {
      latitude: "-22.9068",
      longitude: "-43.1729",
      startDate: "2025-04-22",
      endDate: "2025-04-26",
    });

    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data);
    }
    throw new Error("Problema ao buscar dados do backend");
  }
};