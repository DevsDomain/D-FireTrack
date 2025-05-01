import { Request, Response } from 'express';
import { DownloadImageUseCase } from '@/use-case/DownloadImageUseCase';
import { DownloadImageRepository } from '@/repository/DownloadImage';

class DownloadImageController {
    public async searchImages(req: Request, res: Response): Promise<Response> {
        try {
            const { imagesId } = req.body;

            if (!imagesId || !Array.isArray(imagesId) || imagesId.length === 0) {
                return res.status(400).json({ error: "O campo 'imagesId' é obrigatório e deve ser um array com pelo menos um ID." });
            }

            console.log("IDs recebidos para download:", imagesId);

            const repository = new DownloadImageRepository();
            const useCase = new DownloadImageUseCase(repository);

            const result = await useCase.execute(imagesId); // result: { imagesUrl: string[] }

            console.log("Imagens baixadas com sucesso:", result.imagesUrl);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(" Erro ao baixar imagens:", error.message);
            return res.status(500).json({ error: "Erro interno ao processar o download das imagens." });
        }
    }
}

export default new DownloadImageController();
