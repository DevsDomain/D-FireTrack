import { Request, Response } from "express";
import { SearchParams, StacService } from "../services/stacService";

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
