import fs from 'fs';
import sharp from 'sharp';

export async function processNDVIFromLocalFiles(redPath: string, nirPath: string) {
  try {
    const redBand = await fetchBandFromFile(redPath);
    const nirBand = await fetchBandFromFile(nirPath);
    const ndvi = calculateNDVI(redBand, nirBand);
    return { ndvi };
  } catch (error) {
    throw new Error(`Falha no processamento NDVI: ${(error as Error).message}`);
  }
}

async function fetchBandFromFile(filePath: string): Promise<number[][]> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
  }

  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  if (!width || !height) {
    throw new Error('Dimensões da imagem não definidas.');
  }

  const cropWidth = Math.floor(width * 0.2);
  const cropHeight = Math.floor(height * 0.2);
  const left = Math.floor((width - cropWidth) / 2);
  const top = Math.floor((height - cropHeight) / 2);

  const rawBuffer = await image
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  const band: number[][] = [];
  for (let y = 0; y < cropHeight; y++) {
    const row = [];
    for (let x = 0; x < cropWidth; x++) {
      row.push(rawBuffer[y * cropWidth + x]);
    }
    band.push(row);
  }

  return band;
}

function calculateNDVI(red: number[][], nir: number[][]): number[][] {
  if (red.length !== nir.length || red[0].length !== nir[0].length) {
    throw new Error('As bandas Red e NIR possuem tamanhos diferentes.');
  }

  const ndvi = [];
  for (let i = 0; i < red.length; i++) {
    const row = [];
    for (let j = 0; j < red[i].length; j++) {
      const r = red[i][j];
      const n = nir[i][j];
      const value = (n - r) / (n + r + 1e-6);
      row.push(value);
    }
    ndvi.push(row);
  }
  return ndvi;
}