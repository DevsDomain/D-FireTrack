import { Request, Response } from 'express';
import { DownloadImageUseCase } from '@/use-case/DownloadImageUseCase';
import { DownloadImageRepository } from '@/repository/DownloadImage';
import { ImageClassifierRepository } from '@/repository/ClassificarImage';
import { ClassificarImageUseCase } from '@/use-case/ClassificarImageUseCase';

class DownloadImageController {
    public async searchImages(req: Request, res: Response): Promise<Response> {
        try {
            const { imagesId } = req.body;

            if (!imagesId || !Array.isArray(imagesId) || imagesId.length === 0) {
                return res.status(400).json({ error: "O campo 'imagesId' é obrigatório e deve ser um array com pelo menos um ID." });
            }

            const downloadImageRepository = new DownloadImageRepository();
            const classificarImageRepository = new ImageClassifierRepository();

            const downloadImageuseCase = new DownloadImageUseCase(downloadImageRepository);
            const classificarImageUseCase = new ClassificarImageUseCase(classificarImageRepository);


            const imagesDownloadPath = await downloadImageuseCase.execute(imagesId); // result: { imagesUrl: string[] }

            console.log("Imagem enviada para classificação, Aguarde...");

            // Envia .tiff para a classificação
            const imagesClassificadasPath = await classificarImageUseCase.execute(imagesDownloadPath);


            return res.status(200).json(imagesClassificadasPath);
        } catch (error: any) {
            console.error(" Erro ao baixar imagens:", error.message);
            return res.status(500).json({ error: "Erro interno ao processar o download das imagens." });
        }
    }
}

export default new DownloadImageController();
