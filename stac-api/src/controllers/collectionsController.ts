import { Request, Response } from "express";
import { StacService } from "../services/stacService";

const stacService = new StacService();

export async function getCollections(req: Request, res: Response) {
  try {
    const collections = await stacService.listCollections();
    res.json({ collections });
  } catch (error) {
    console.error("Erro ao buscar coleções:", error);
    res
      .status(500)
      .json({
        error: "Erro ao buscar coleções",
        details: (error as Error).message,
      });
  }
}
