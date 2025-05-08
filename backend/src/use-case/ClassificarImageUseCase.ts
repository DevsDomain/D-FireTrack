import { IImageClassifier, ImageClassifierRequest, ImageClassifierResponse } from "@/repository/ClassificarImage";


export class ClassificarImageUseCase {
    constructor(private classificarImageRepository: IImageClassifier) { }

    async execute(imagesUrl: ImageClassifierRequest): Promise<ImageClassifierResponse> {

        const ClassificacaoResult: ImageClassifierResponse = await this.classificarImageRepository.classificadorImages(imagesUrl);

        return ClassificacaoResult;
    }
}
