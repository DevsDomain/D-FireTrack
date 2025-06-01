import { BuscarImageRepository, BuscarImageRequest, BuscarImageResponse } from "@/repository/BuscarImage";


 interface BuscarImageCoordRequest {
    imageName: String;
    geometry: {
      type: "Polygon";
      coordinates: [number, number][][];
    }
  }
  
export class BuscarImageUseCase {
    constructor(private buscarImageRepository: BuscarImageRepository) { }

    async execute({imageName,geometry}:BuscarImageCoordRequest): Promise<BuscarImageResponse | null> {

        let postData = imageName.split("_");


        let input = postData[3];

        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);

        // Format to dd/MM/yyyy
        const formattedDate = `${day}/${month}/${year}`;

        const imageFound = await this.buscarImageRepository.buscarImage({ date: formattedDate,geometry });

        if (imageFound) {
            return imageFound
        }
        else {
            return null
        }


    }
}
