import { processNDVIFromLocalFiles } from '../services/ndviService';
import { generateNDVIImage } from '../services/ndviImageService';
import { classifyNDVIWithKNN } from '../services/knnService';
import { generateClassifiedImage } from '../services/classifiedImage';
import fs from 'fs';

(async () => {
  const redPath = '../data/CBERS_4A_WFI_20240821_210_140_L4_BAND15.tif';
  const nirPath = '../data/CBERS_4A_WFI_20240821_210_140_L4_BAND16.tif';
  const patternsPath = '../data/patterns.json';
  const ndviMatrixPath = '../dataOutput/ndvi_matrix.json';
  const ndviImagePath = '../dataOutput/ndvi_image.png';
  const classificationOutputPath = '../dataOutput/classification.json';
  const classifiedImagePath = '../dataOutput/classified_image.png';

  try {
    console.log('Calculando NDVI...');
    const { ndvi } = await processNDVIFromLocalFiles(redPath, nirPath);

    console.log('Salvando matriz NDVI...');
    fs.writeFileSync(ndviMatrixPath, JSON.stringify(ndvi, null, 2));

    console.log('Gerando imagem NDVI...');
    await generateNDVIImage(ndvi, ndviImagePath);

    console.log('Classificando NDVI com KNN...');
    const classification = await classifyNDVIWithKNN(ndvi, patternsPath);

    console.log('Salvando classificação...');
    fs.writeFileSync(classificationOutputPath, JSON.stringify(classification, null, 2));

    console.log('Gerando imagem classificada...');
    await generateClassifiedImage(classification, classifiedImagePath);

    console.log('Processo concluído. Matriz NDVI, imagem NDVI, classificação e imagem classificada salvas.');
  } catch (error) {
    console.error('Erro:', error);
  }
})();