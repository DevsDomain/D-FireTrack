import { BuscarImageRepository, BuscarImageResponse } from "@/repository/BuscarImage";


export class BuscarImageUseCase {
    constructor(private buscarImageRepository: BuscarImageRepository) { }

    async execute(imageName: String): Promise<BuscarImageResponse | null> {

        let postData = imageName.split("_");


        let input = postData[3];
        let xcoord = postData[4];
        let ycoord = postData[5];

        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);

        // Format to dd/MM/yyyy
        const formattedDate = `${day}/${month}/${year}`;

        const imageFound = await this.buscarImageRepository.buscarImage({ xcoord, ycoord, date: formattedDate });

        if (imageFound) {
            return { imageUrl: imageFound.imageUrl }
        }
        else {
            return null
        }


    }
}
