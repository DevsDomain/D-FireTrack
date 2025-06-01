import ImagemClassificadaModel, { ImagemClassificada } from "@/models/ImagemClassificadaModel";

export interface BuscarImageResponse {
  image: ImagemClassificada;
}

export interface BuscarImageRequest {
  date: string;
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  }
}

export class BuscarImageRepository {

  async buscarImage({ date, geometry }: BuscarImageRequest): Promise<BuscarImageResponse | null> {

    const imageUrl = await ImagemClassificadaModel.findOne({
      date,
      geometry: {
        $geoIntersects: {
          $geometry: geometry
        }
      }
    });

    console.log("RESULTADO DA BUSCA FINDONE", imageUrl)

    if (imageUrl?.$isValid) {
      return { image: imageUrl }
    }
    else {
      return null;
    }

  }
}

