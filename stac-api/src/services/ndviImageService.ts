import sharp from 'sharp';

/**
 * Gera uma imagem em escala de cinza a partir de uma matriz NDVI.
 * Aplica realce de contraste para aumentar a diferença entre os tons.
 * @param ndviMatrix Matriz NDVI com valores entre 0 e 1.
 * @param outputPath Caminho para salvar a imagem gerada.
 */
export async function generateNDVIImage(ndviMatrix: number[][], outputPath: string): Promise<void> {
  const height = ndviMatrix.length;
  const width = ndviMatrix[0].length;

  // Encontra os valores mínimo e máximo na matriz NDVI
  let min = Infinity;
  let max = -Infinity;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = ndviMatrix[y][x];
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }

  console.log(`NDVI Min: ${min}, Max: ${max}`);

  // Cria um buffer para armazenar os valores de intensidade (escala de cinza)
  const imageBuffer = Buffer.alloc(width * height); // 1 canal (escala de cinza)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ndviValue = ndviMatrix[y][x];

      // Realce de contraste: normaliza os valores para a faixa de 0 a 255
      const normalizedValue = (ndviValue - min) / (max - min); // Normaliza para 0 a 1
      const intensity = Math.floor(normalizedValue * 255); // Converte para 0 a 255
      const pixelIndex = y * width + x;

      imageBuffer[pixelIndex] = intensity; // Define a intensidade do pixel
    }
  }

  // Cria a imagem usando o buffer
  await sharp(imageBuffer, { raw: { width, height, channels: 1 } }) // 1 canal para escala de cinza
    .toFile(outputPath);

  console.log(`Imagem NDVI gerada com sucesso em escala de cinza: ${outputPath}`);
}