import { processNDVIFromLocalFiles } from '../services/ndviService';
import { generateNDVIImage } from '../services/ndviImageService';
import { classifyNDVIWithKNN } from '../services/knnService';
import { generateClassifiedImage } from '../services/classifiedImage';
import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';

class ClassifierController {
  async classifyImage(req: Request, res: Response) {

    console.log("BATEU")

    const projectRoot = path.resolve(__dirname, '..', '..');
    const basePath = path.join(projectRoot, 'src', 'dataOutput');
    const patternsPath = path.join(projectRoot, 'src', 'data', 'patterns.json');

    const ndviMatrixPath = path.join(basePath, 'ndvi_matrix.json');
    const ndviImagePath = path.join(basePath, 'ndvi_image.png');
    const classificationOutputPath = path.join(basePath, 'classification.json');
    const classifiedImagePath = path.join(basePath, 'classified_image.png');


    try {
      const { redPath, nirPath } = req.body;


      console.log("REDPATH recebido", redPath);
      console.log("nirPath recebido", nirPath);

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      console.log('Calculando NDVI...');
      const { ndvi } = await processNDVIFromLocalFiles(redPath, nirPath);


      fs.writeFileSync(ndviMatrixPath, JSON.stringify(ndvi, null, 2));

      await generateNDVIImage(ndvi, ndviImagePath);

      const classification = await classifyNDVIWithKNN(ndvi, patternsPath);

      console.log('Salvando classificação...');
      fs.writeFileSync(classificationOutputPath, JSON.stringify(classification, null, 2));

      console.log('Gerando imagem classificada...');
      const caminhoDaImagemClassificada = await generateClassifiedImage(classification, classifiedImagePath);

      console.log('Processo concluído. Matriz NDVI, imagem NDVI, classificação e imagem classificada salvas.');

      res.status(200).json({imageUrl:caminhoDaImagemClassificada});
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

export default new ClassifierController();