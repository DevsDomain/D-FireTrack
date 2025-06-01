import { IDownloadImage, DownloadImageResponse } from "@/repository/DownloadImage";

interface imagens {
    id: string;
    geometry: {
        type: "Polygon";
        coordinates: [number, number][][];
    };
}
export class DownloadImageUseCase {
    constructor(private downloadImageRepository: IDownloadImage) { }

    async execute(imagesId: imagens): Promise<DownloadImageResponse> {

        // 1. Usa id retornados para fazer o download da imagem
        const downloadResult: DownloadImageResponse = await this.downloadImageRepository.downloadImage(imagesId);

        return downloadResult;
    }
}
