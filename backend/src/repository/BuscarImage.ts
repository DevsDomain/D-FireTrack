import ImagemClassificadaModel from "@/models/ImagemClassificadaModel";

export interface BuscarImageResponse {
  imageUrl: string;
}

export interface BuscarImageRequest {
  xcoord: string;
  ycoord: string;
  date: string;
}

export class BuscarImageRepository {

  async buscarImage({ xcoord, ycoord, date }: BuscarImageRequest): Promise<BuscarImageResponse | null> {

    console.log("BUSCANDO IMAGEM",xcoord,ycoord,date);

    const imageUrl = await ImagemClassificadaModel.findOne({
      where: { xcoord, ycoord, date }
    });
    

    console.log("RESULTADO DA BUSCA FINDONE",imageUrl)

    if (imageUrl?.image) {
      return { imageUrl: imageUrl.image }
    }
    else {
      return null;
    }

  }
}

