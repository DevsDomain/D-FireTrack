import axios from "axios";


export interface ImageClassifierResponse {
  imageUrl: string;
}

export interface ImageClassifierRequest {
  redPath: string;
  nirPath: string;
}



export interface IImageClassifier {
  classificadorImages(imagesUrl: ImageClassifierRequest): Promise<ImageClassifierResponse>;
}

export class ImageClassifierRepository implements IImageClassifier {
  async classificadorImages(imagesUrl: ImageClassifierRequest): Promise<ImageClassifierResponse> {

    const baseURL = "http://localhost:3333"

    const response = await axios.post(`${baseURL}/classificacao`, imagesUrl);
    return response.data

  }


}
