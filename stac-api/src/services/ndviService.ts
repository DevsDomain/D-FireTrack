import fs from 'fs';
import sharp from 'sharp';

export async function processNDVIFromLocalFiles(redPath: string, nirPath: string) {
  try {
    console.log(`Processing RED band: ${redPath}`);
    const redBand = await fetchBandFromFile(redPath);

    console.log(`Processing NIR band: ${nirPath}`);
    const nirBand = await fetchBandFromFile(nirPath);

    console.log('Calculating NDVI...');
    const ndvi = calculateNDVI(redBand, nirBand);
    return { ndvi };
  } catch (error) {
    throw new Error(`Falha no processamento NDVI: ${(error as Error).message}`);
  }
}

async function fetchBandFromFile(filePath: string): Promise<number[][]> {
  try {
    console.log(`Checking file path: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }

    console.log(`Reading image metadata for: ${filePath}`);
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height, format } = metadata;

    console.log(`Image Metadata - Format: ${format}, Width: ${width}, Height: ${height}`);

    if (!width || !height) {
      throw new Error('Dimensões da imagem não definidas.');
    }

    if (format !== 'tiff') {
      throw new Error(`Formato de imagem não suportado: ${format}`);
    }

    const cropWidth = Math.floor(width * 0.2);
    const cropHeight = Math.floor(height * 0.2);
    const left = Math.floor((width - cropWidth) / 2);
    const top = Math.floor((height - cropHeight) / 2);

    console.log(`Extracting region - Left: ${left}, Top: ${top}, Width: ${cropWidth}, Height: ${cropHeight}`);

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

    console.log(`Extracted band data with dimensions: ${band.length} x ${band[0]?.length}`);
    return band;

  } catch (error) {
    throw new Error(`Erro ao processar o arquivo ${filePath}: ${(error as Error).message}`);
  }
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
