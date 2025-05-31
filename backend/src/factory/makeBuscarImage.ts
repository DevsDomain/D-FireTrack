import { BuscarImageRepository } from "@/repository/BuscarImage";
import { BuscarImageUseCase } from "@/use-case/BuscarImageUseCase";

export default function MakebuscarImageUseCase(){
    const repository = new BuscarImageRepository();
    const useCase = new BuscarImageUseCase(repository);

    return useCase;
}