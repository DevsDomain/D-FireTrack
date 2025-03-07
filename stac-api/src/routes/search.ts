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
 *       - in: query
 *         name: bbox
 *         required: false
 *         description: "Bounding Box (array de 4 números no formato `minX,minY,maxX,maxY`)."
 *         schema:
 *           type: string
 *           example: "-60,-10,-50,-5"
 *       - in: query
 *         name: datetime
 *         required: false
 *         description: "Intervalo de datas no formato AAAA-MM-DD/AAAA-MM-DD."
 *         schema:
 *           type: string
 *           example: "2023-01-01/2023-12-31"
 *       - in: query
 *         name: limit
 *         required: false
 *         description: "Número máximo de itens a retornar."
 *         schema:
 *           type: integer
 *           example: 10
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
 *             example:
 *               features:
 *                 - id: "item1"
 *                   collection: "example_collection"
 *                   bbox: [-60, -10, -50, -5]
 *                   datetime: "2023-06-15T00:00:00Z"
 *                   image_url: "https://example.com/image.jpg"
 *       400:
 *         description: Parâmetro obrigatório ausente ou mal formatado.
 *         content:
 *           application/json:
 *             example:
 *               error: "O parâmetro 'collection' é obrigatório e deve ser uma string"
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro interno no servidor"
 *
 */
router.get("/", searchItems);

export default router;
