import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os";

export interface SearchImageResponse {
  idImage: string;
}

interface imagens {
  id: string;
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
}

export interface DownloadImageResponse {
  redPath: string;
  nirPath: string;
}

export interface IDownloadImage {
  downloadImage(imagesId: imagens): Promise<DownloadImageResponse>;
}

export class DownloadImageRepository implements IDownloadImage {
  async downloadImage(imagesId: imagens): Promise<DownloadImageResponse> {
    const collection = "CB4-WFI-L4-SR-1";
    const band = ["BAND15", "BAND16"];
    const tempDir = path.join(os.tmpdir(), "inpe-downloads");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    let downloadedPaths: DownloadImageResponse = {
      redPath: "",
      nirPath: ""
    }

    const id = imagesId.id

    try {
      const stacUrl = `https://data.inpe.br/bdc/stac/v1/collections/${collection}/items/${id}`;
      const { data } = await axios.get(stacUrl);

      if (!data.assets || !data.assets[band[0]] || !data.assets[band[1]]) {
        console.warn(`⚠️ Banda '${band}' não encontrada no item '${id}'`);
      }

      const bandsUrls = {
        red: data.assets[band[0]].href,
        nir: data.assets[band[1]].href

      }

      const fileNames = {
        red: `${id}_${band[0]}.tif`,
        nir: `${id}_${band[1]}.tif`
      }

      const filePaths = {
        red: path.join(tempDir, fileNames.red),
        nir: path.join(tempDir, fileNames.nir)
      };

      console.log(`Iniciando download de ${fileNames.red} e ${fileNames.nir}...`);

      await Promise.all([
        this.downloadFile(bandsUrls.red, filePaths.red, fileNames.red),
        this.downloadFile(bandsUrls.nir, filePaths.nir, fileNames.nir)
      ]);

      console.log(`✅ Download completo: ${fileNames.red}, ${fileNames.nir}`);

      downloadedPaths = {
        redPath: filePaths.red,
        nirPath: filePaths.nir
      };


    } catch (error: any) {
      console.error(`❌ Erro ao baixar o item '${id}':`, error.message || error);
    }


    return downloadedPaths;
  }

  private async downloadFile(url: string, filePath: string, fileName: string): Promise<void> {
    try {
      const response = await axios.get(url, { responseType: "stream" });

      const totalLength = parseInt(response.headers["content-length"], 10);
      let downloadedBytes = 0;

      const writer = fs.createWriteStream(filePath);

      response.data.on("data", (chunk: Buffer) => {
        downloadedBytes += chunk.length;
        const percentage = ((downloadedBytes / totalLength) * 100).toFixed(2);
        process.stdout.write(`📊 [${fileName}] Progresso: ${percentage}%\r`);
      });

      await new Promise<void>((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

    } catch (error: any) {
      console.error(`❌ Erro ao baixar o arquivo '${fileName}':`, error.message || error);
      throw error;
    }
  }
}
