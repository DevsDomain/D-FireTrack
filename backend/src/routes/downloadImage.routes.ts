
import DownloadImageController from '@/controllers/DownloadImageController';
import { Router } from 'express';

const downloadImageRoute = Router();


// Rota para obter todas as alterações
downloadImageRoute.post('/search', DownloadImageController.searchImages);

export default downloadImageRoute;
