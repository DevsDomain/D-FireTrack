import { Request, Response } from 'express';
import makeListarImagens from '@/factory/makeListarImage';


class ListImagesController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
           
            const listarImagens = makeListarImagens();
            const imagens = await listarImagens.execute();
            
            return res.status(200).json(imagens);

        } catch (error: any) {
            console.error("Não foram encontradas imagens:", error.message);
            return res.status(500).json({ error: "Erro interno ao buscar imagens." });
        }
    }
}

export default new ListImagesController();
