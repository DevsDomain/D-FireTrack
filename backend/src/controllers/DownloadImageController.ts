import { Request, Response } from 'express';
import { DownloadImageUseCase } from '@/use-case/DownloadImageUseCase';
import { DownloadImageRepository } from '@/repository/DownloadImage';
import { ImageClassifierRepository } from '@/repository/ClassificarImage';
import { ClassificarImageUseCase } from '@/use-case/ClassificarImageUseCase';
import MakebuscarImageUseCase from '@/factory/makeBuscarImage';
import { z } from 'zod';
import { imageSchema } from '@/validators';


class DownloadImageController {
    public async searchImages(req: Request, res: Response): Promise<Response> {
        try {
            const requestBodySchema = z.object({
                images: z.array(imageSchema)
            })

            const parsed = requestBodySchema.safeParse(req.body);

            if (!parsed.success) {
                return res.status(400).json({ error: parsed.error.flatten() });
            }

            const imagensRecebidas = parsed.data.images


            const downloadImageRepository = new DownloadImageRepository();
            const classificarImageRepository = new ImageClassifierRepository();

            const buscarImageUseCase = MakebuscarImageUseCase();
            const downloadImageuseCase = new DownloadImageUseCase(downloadImageRepository);
            const classificarImageUseCase = new ClassificarImageUseCase(classificarImageRepository);

            // VERIFICA SE JÁ TEMOS A IMAGEM CLASSIFICADA
            let imagemRecebida = imagensRecebidas[0]
            const buscarImagem = await buscarImageUseCase.execute({
                imageName: imagemRecebida.id,
                geometry: imagemRecebida.geometry
            });

            if (buscarImagem) {
                console.log("Imagem encontrada no mongoDB, retornando objeto classificado")
                return res.status(200).json(buscarImagem);
            }

            console.log("NÃO ENCONTROU", buscarImagem)

            const imagesDownloadPath = await downloadImageuseCase.execute(imagensRecebidas[0]); // result: { imagesUrl: string[] }

            console.log("Imagem enviada para classificação, Aguarde...");

            // Envia .tiff para a classificação
            const imagesClassificadasPath = await classificarImageUseCase.execute(imagesDownloadPath, imagensRecebidas[0].geometry);


            return res.status(200).json(imagesClassificadasPath);
        } catch (error: any) {
            console.error(" Erro ao baixar imagens:", error.message);
            return res.status(500).json({ error: "Erro interno ao processar o download das imagens." });
        }
    }
}

export default new DownloadImageController();
