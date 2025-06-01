import ImagemClassificadaModel, { ImagemClassificada } from "@/models/ImagemClassificadaModel";

export interface ListarImageResponse {
  image: ImagemClassificada[];
}


export class ListarImageRepository {

  async listarImage(): Promise<ListarImageResponse | null> {

    const image: ImagemClassificada[] = await ImagemClassificadaModel.find();

    if (image.length > 0) {
      return { image }
    }

    return null


  }
}

