import { ListarImageRepository } from "@/repository/ListarImagens";
import { ListarImageUseCase } from "@/use-case/ListarImagesUseCase";


export default function makeListarImagens(){
    const repository = new ListarImageRepository();
    const useCase = new ListarImageUseCase(repository);

    return useCase;
}