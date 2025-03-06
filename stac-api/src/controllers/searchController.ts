import { Request, Response } from "express";
import { SearchParams, StacService } from "../services/stacService";

const stacService = new StacService();

export async function searchItems(req: Request, res: Response): Promise<void> {
  const { collection, bbox, datetime, limit, ...extraParams } = req.query;

  if (!collection || typeof collection !== "string") {
    res.status(400).json({
      error: 'O parâmetro "collection" é obrigatório e deve ser uma string',
    });
  }

  const searchParams: SearchParams = {
    collections: [collection as string],
    bbox: bbox ? (JSON.parse(bbox as string) as number[]) : undefined,
    datetime: datetime as string | undefined,
    limit: limit ? Number(limit) : undefined,
    query: Object.keys(extraParams).length ? extraParams : undefined,
  };

  try {
    const items = await stacService.search(searchParams);
    res.json({ features: items });
  } catch (error) {
    console.error("Erro ao buscar itens da coleção:", collection, error);
    res.status(500).json({
      error: "Erro ao buscar itens",
      details: (error as Error).message,
    });
  }
}
