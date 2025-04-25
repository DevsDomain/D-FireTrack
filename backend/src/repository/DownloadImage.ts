import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os";

export interface SearchImageResponse {
  idImage: string;
}

export interface DownloadImageResponse {
  imagesUrl: string[];
}

export interface IDownloadImage {
  downloadImage(imagesId: string[]): Promise<DownloadImageResponse>;
}

export class DownloadImageRepository implements IDownloadImage {
  async downloadImage(imagesId: string[]): Promise<DownloadImageResponse> {
    const collection = "CB4-WFI-L4-SR-1";
    const band = "BAND15";
    const tempDir = path.join(os.tmpdir(), "inpe-downloads");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const downloadedPaths: string[] = [];

    for (const id of imagesId) {
      try {
        const stacUrl = `https://data.inpe.br/bdc/stac/v1/collections/${collection}/items/${id}`;
        const { data } = await axios.get(stacUrl);

        if (!data.assets || !data.assets[band]) {
          console.warn(`⚠️ Banda '${band}' não encontrada no item '${id}'`);
          continue;
        }

        const imageUrl = data.assets[band].href;
        const ext = path.extname(new URL(imageUrl).pathname) || ".tif";
        const fileName = `${id}_${band}${ext}`;
        const filePath = path.join(tempDir, fileName);

        const response = await axios.get(imageUrl, { responseType: "stream" });
        const totalLength = parseInt(response.headers["content-length"], 10);
        const writer = fs.createWriteStream(filePath);

        let downloadedBytes = 0;

        response.data.on("data", (chunk: Buffer) => {
          downloadedBytes += chunk.length;
          const percentage = ((downloadedBytes / totalLength) * 100).toFixed(2);
          process.stdout.write(`📊 [${id}] Progresso: ${percentage}%\r`);
        });

        await new Promise<void>((resolve, reject) => {
          response.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        console.log(`\n✅ Download completo: ${fileName}`);
        downloadedPaths.push(filePath);

      } catch (error: any) {
        console.error(`❌ Erro ao baixar o item '${id}':`, error.message || error);
      }
    }

    return {
      imagesUrl: downloadedPaths,
    };
  }
}
