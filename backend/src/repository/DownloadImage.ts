import axios from "axios";
import { Collection } from "mongoose";

export interface SearchImageResponse {
  idImage: string;
}

export interface DownloadImageResponse {
  imagesUrl: string[];
}

export interface IDownloadImage {
  downloadImage: (
    imagesId: string[],
  ) => Promise<DownloadImageResponse>;
}

export class DownloadImageRepository implements IDownloadImage {

  async downloadImage(imagesId: string[]): Promise<DownloadImageResponse> {
    const payload = {
      collection: "CB4-WFI-L4-SR-1",
      id: imagesId,
      band: "BAND15"
    };

    console.log("PAYLOAD DENTRO DO REPOSITORY", payload)
    console.log("URL MONTADA", `http://localhost:3333/search/download?collection=${payload.collection}&itemId=${payload.id[0]}&band=${payload.band}`)
    const response = await axios.get(`http://localhost:3333/search/download?collection=${payload.collection}&itemId=${payload.id[0]}&band=${payload.band}`)

    console.log("RESPONSE DENTRO DO REPO", response);
    //await axios.post("http://localhost:3333/search/download", payload);

    if (!response.data) {
      throw new Error("No image URL returned from the API.");
    }

    return {
      imagesUrl: response.data,
    };
  }
}
