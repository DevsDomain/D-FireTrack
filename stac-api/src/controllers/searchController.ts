import { Request, Response } from "express";
import { SearchParams, StacService } from "../services/stacService";
import axios from "axios";
import path from "path";
import fs from "fs";

const stacService = new StacService();

export async function searchItems(req: Request, res: Response): Promise<void> {
  const { collection, bbox, datetime, limit, ...extraParams } = req.query;

  if (!collection || typeof collection !== "string") {
    res.status(400).json({
      error: 'O parâmetro "collection" é obrigatório e deve ser uma string',
    });
    return;
  }

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
    collections: [collection as string],
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

    if (!collection || typeof collection !== "string") {
      res.status(400).json({
        error: "O parâmetro 'collection' é obrigatório e deve ser uma string",
      });
      return;
    }

    if (!itemId || typeof itemId !== "string") {
      res.status(400).json({
        error: "O parâmetro 'itemId' é obrigatório e deve ser uma string",
      });
      return;
    }

    if (!band || typeof band !== "string") {
      res.status(400).json({
        error:
          "O parâmetro 'band' é obrigatório e deve ser uma string. Exemplo: B02, B08, thumbnail",
      });
      return;
    }

    // URL base da API STAC do INPE
    const stacUrl = `https://data.inpe.br/bdc/stac/v1/collections/${collection}/items/${itemId}`;

    // Obtém os dados do item para buscar a URL da banda desejada
    const { data } = await axios.get(stacUrl);

    // Verifica se a banda solicitada existe na resposta
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

    // Baixa a imagem da URL fornecida
    const response = await axios.get(imageUrl, { responseType: "stream" });

    // Obtém a extensão do arquivo
    const ext = path.extname(imageUrl).split("?")[0] || ".tif";

    // Define um nome de arquivo temporário com o itemId e a banda
    //const sanitizedItemId = itemId.replace(/[^\w\-]/g, "_"); // evita caracteres problemáticos
    const fileName = `${itemId}_${band}${ext}`;
    const filePath = path.join(__dirname, "../../temp", fileName);

    // Salva a imagem temporariamente
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("❌ Erro ao enviar arquivo:", err);
          res.status(500).json({ error: "Erro ao baixar a imagem" });
        }

        // Remove o arquivo temporário após o download
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
