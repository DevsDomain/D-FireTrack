import { ImagemClassificada } from "@/models/ImagemClassificadaModel";
import { ListarImageRepository } from "@/repository/ListarImagens";


export class ListarImageUseCase {
  constructor(private listarImageRepository: ListarImageRepository) { }

  async execute(): Promise<ImagemClassificada[] | undefined> {

    const imagens = await this.listarImageRepository.listarImage();

    return imagens?.image


  }
}
