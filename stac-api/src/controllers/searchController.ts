import { Request, Response } from "express";
import { SearchParams, StacService } from "../services/stacService";
import axios from "axios";
import path from "path";
import fs from "fs";

const stacService = new StacService();

// Função utilitária para validar query params
function validateQueryParam<T>(
  value: any,
  name: string,
  type: string,
  res: Response
): value is T {
  if (!value || typeof value !== type) {
    res.status(400).json({
      error: `O parâmetro '${name}' é obrigatório e deve ser uma ${type}`,
    });
    return false;
  }
  return true;
}

export async function searchItems(req: Request, res: Response): Promise<void> {
  const { collection, bbox, datetime, limit, ...extraParams } = req.query;

  if (!validateQueryParam<string>(collection, "collection", "string", res))
    return;

  let parsedBbox: number[] | undefined;
  if (bbox) {
    if (typeof bbox === "string") {
      parsedBbox = bbox.split(",").map(Number);
    } else if (Array.isArray(bbox)) {
      parsedBbox = bbox.map(Number);
    }

    if (!parsedBbox || parsedBbox.length !== 4 || parsedBbox.some(isNaN)) {
      res.status(400).json({
        error:
          'O parâmetro "bbox" deve ser um array de 4 números, ex: -60,-10,-50,-5',
      });
      return;
    }
  }

  const searchParams: SearchParams = {
    collections: [collection],
    bbox: parsedBbox,
    datetime: datetime as string | undefined,
    limit: limit ? Number(limit) : undefined,
    query: Object.keys(extraParams).length ? extraParams : undefined,
  };

  console.log("🔍 Parâmetros de busca:", searchParams);

  try {
    const items = await stacService.search(searchParams);
    console.log("✅ Itens encontrados:", items);
    res.json({ features: items });
  } catch (error) {
    console.error("❌ Erro ao buscar itens da coleção:", collection, error);
    res.status(500).json({
      error: "Erro ao buscar itens",
      details: (error as Error).message,
    });
  }
}

export const downloadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { collection, itemId, band } = req.query;

    if (!validateQueryParam<string>(collection, "collection", "string", res))
      return;
    if (!validateQueryParam<string>(itemId, "itemId", "string", res)) return;
    if (!validateQueryParam<string>(band, "band", "string", res)) return;

    const stacUrl = `https://data.inpe.br/bdc/stac/v1/collections/${collection}/items/${itemId}`;
    const { data } = await axios.get(stacUrl);

    if (!data.assets || !data.assets[band]) {
      res.status(404).json({
        error: `Banda '${band}' não encontrada no item '${itemId}'. Bandas disponíveis: ${Object.keys(
          data.assets
        ).join(", ")}`,
      });
      return;
    }

    const imageUrl = data.assets[band].href;
    console.log(`📥 Baixando imagem da URL: ${imageUrl}`);

    const response = await axios.get(imageUrl, { responseType: "stream" });

    const ext = path.extname(new URL(imageUrl).pathname) || ".tif";
    const fileName = `${itemId}_${band}${ext}`;
    const filePath = path.join(__dirname, "../../temp", fileName);

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("error", (err) => {
      console.error("❌ Erro ao salvar a imagem:", err);
      res.status(500).json({ error: "Erro ao salvar a imagem" });
    });

    writer.on("finish", () => {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("❌ Erro ao enviar arquivo:", err);
          res.status(500).json({ error: "Erro ao baixar a imagem" });
        }

        fs.unlink(filePath, (err) => {
          if (err) console.error("⚠️ Erro ao remover arquivo temporário:", err);
        });
      });
    });
  } catch (error) {
    console.error("❌ Erro ao baixar a imagem:", error);
    res.status(500).json({ error: "Erro ao baixar a imagem" });
  }
};
