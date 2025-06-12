import sharp from 'sharp';

/**
 * Gera uma imagem classificada com base no JSON de classificação KNN.
 * @param classificationMatrix Matriz de classificação (mesmo tamanho da matriz NDVI).
 * @param outputPath Caminho para salvar a imagem gerada.
 */
export async function generateClassifiedImage(classificationMatrix: string[][], outputPath: string): Promise<string> {
  const height = classificationMatrix.length;
  const width = classificationMatrix[0].length;

  // Cria um buffer para armazenar os valores de cores (RGB)
  const imageBuffer = Buffer.alloc(width * height * 3); // 3 canais (R, G, B)

  // Define as cores para cada classe
  const classColors: Record<string, [number, number, number]> = {
    Queimada: [255, 0, 0], // Preto
    Vegetacao: [0, 255, 0], // Verde
    Agua: [0, 0, 255], // Azul
    Nuvem: [255, 255, 255], // Branco
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const classification = classificationMatrix[y][x];
      const color = classColors[classification] || [225, 225, 225]; // Preto para classes desconhecidas

      const pixelIndex = (y * width + x) * 3;
      imageBuffer[pixelIndex] = color[0]; // R
      imageBuffer[pixelIndex + 1] = color[1]; // G
      imageBuffer[pixelIndex + 2] = color[2]; // B
    }
  }

  // Cria a imagem usando o buffer
  await sharp(imageBuffer, { raw: { width, height, channels: 3 } }) // 3 canais para RGB
    .toFile(outputPath);

  console.log('Classes encontradas:', [...new Set(classificationMatrix.flat())]);
  console.log(`Imagem classificada gerada com sucesso: ${outputPath}`);
  return outputPath
}