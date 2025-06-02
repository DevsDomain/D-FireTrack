
import ListImagesController from '@/controllers/ListImagesController';
import { Router } from 'express';

const listarImageRoute = Router();


// Rota para obter todas as alterações
listarImageRoute.get('/list', ListImagesController.list);

export default listarImageRoute;
