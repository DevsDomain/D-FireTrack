import { Request, Response } from 'express';
import { DownloadImageUseCase } from '@/use-case/DownloadImageUseCase';
import { DownloadImageRepository } from '@/repository/DownloadImage';
import { LatLong } from '@/types/coordinates';

class DownloadImageController {
    public async searchImages(req: Request, res: Response): Promise<Response> {
        try {
            const { imagesUrl} = req.body;

            if (!imagesUrl) {
                return res.status(400).json({ error: "Parâmetros obrigatórios ausentes." });
            }


            console.log(" Parâmetros recebidos:", imagesUrl);

            const repository = new DownloadImageRepository();
            const useCase = new DownloadImageUseCase(repository);

            const result = await useCase.execute(imagesUrl)

            console.log(" Resultado final (imagens):", result);

            return res.status(200).json(result);

        } catch (error: any) {
            console.error("Erro ao buscar imagem:", error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new DownloadImageController();
