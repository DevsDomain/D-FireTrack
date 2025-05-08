import { IDownloadImage, DownloadImageResponse } from "@/repository/DownloadImage";

export class DownloadImageUseCase {
    constructor(private downloadImageRepository: IDownloadImage) { }

    async execute(imagesId: string[]): Promise<DownloadImageResponse> {

        // 1. Usa id retornados para fazer o download da imagem
        const downloadResult: DownloadImageResponse = await this.downloadImageRepository.downloadImage(imagesId);

        return downloadResult;
    }
}
