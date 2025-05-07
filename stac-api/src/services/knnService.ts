import fs from 'fs';

/**
 * Classifica cada pixel da matriz NDVI com base no KNN.
 * @param ndviMatrix Matriz NDVI com valores entre 0 e 1.
 * @param patternsPath Caminho para o arquivo JSON com os padrões conhecidos.
 * @returns Matriz de classificações (mesmo tamanho da matriz NDVI).
 */
export async function classifyNDVIWithKNN(ndviMatrix: number[][], patternsPath: string): Promise<string[][]> {
  // Carrega os padrões conhecidos do arquivo JSON
  const patterns = JSON.parse(fs.readFileSync(patternsPath, 'utf-8')) as { label: string; ndvi: number }[];

  const height = ndviMatrix.length;
  const width = ndviMatrix[0].length;

  // Matriz para armazenar as classificações
  const classificationMatrix: string[][] = Array.from({ length: height }, () => Array(width).fill(''));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ndviValue = ndviMatrix[y][x];

      // Calcula a distância de cada padrão ao valor NDVI atual
      const distances = patterns.map(pattern => ({
        label: pattern.label,
        distance: Math.abs(pattern.ndvi - ndviValue),
      }));

      // Ordena os padrões pela distância (menor distância primeiro)
      distances.sort((a, b) => a.distance - b.distance);

      // Pega os 3 vizinhos mais próximos
      const kNearestNeighbors = distances.slice(0, 3);

      // Vota entre os 3 vizinhos mais próximos
      const votes: Record<string, number> = {};
      kNearestNeighbors.forEach(neighbor => {
        votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
      });

      // Determina a classificação com mais votos
      const classification = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));

      // Armazena a classificação na matriz
      classificationMatrix[y][x] = classification;
    }
  }

  return classificationMatrix;
}