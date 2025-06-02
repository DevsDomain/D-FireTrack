import { IImageClassifier, ImageClassifierRequest, ImageGeometry } from "@/repository/ClassificarImage";
import ImagemClassificadaModel, { ImagemClassificada } from '../models/ImagemClassificadaModel';

interface ImageClassifierResponse {
    imageUrl: string
}

export class ClassificarImageUseCase {
    constructor(private classificarImageRepository: IImageClassifier) { }

    async execute(imagesUrl: ImageClassifierRequest,imageGeom:ImageGeometry): Promise<ImagemClassificada> {
        
        
        const imagemURL = imagesUrl.redPath;
                
        let postData = imagemURL.split("_");
        
        let input = postData[3];
        let xcoord = postData[4];
        let ycoord = postData[5];
        
        const year = input.substring(0, 4);
        const month = input.substring(4, 6);
        const day = input.substring(6, 8);
        
        // Format to dd/MM/yyyy
        const formattedDate = `${day}/${month}/${year}`;
        
        // Envia imagens para o classificador STAC-API
        const ClassificacaoResult: ImageClassifierResponse = await this.classificarImageRepository.classificadorImages(imagesUrl,imageGeom);
        

        // EXEMPLO DE IMAGEM : CBERS_4_AWFI_20250403_158_123
        // SALVAR CAMINHO DA IMAGEM NO MONGODB
        const imageObject = await ImagemClassificadaModel.create({
            image: ClassificacaoResult.imageUrl,
            date: formattedDate,
            xcoord,
            ycoord,
            geometry:imageGeom
        });

        imageObject.save();

        return imageObject;
    }
}
