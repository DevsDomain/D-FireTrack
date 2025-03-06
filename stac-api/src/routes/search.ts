import { Router } from "express";
import { searchItems } from "../controllers/searchController";

const router = Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Busca itens em uma coleção específica.
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: collection
 *         required: true
 *         description: Nome da coleção a ser buscada.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Itens encontrados na coleção.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Parâmetro collection é obrigatório.
 *       500:
 *         description: Erro ao buscar itens.
 */
router.get("/", searchItems);

export default router;
