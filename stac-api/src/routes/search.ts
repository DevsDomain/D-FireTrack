import { Router } from "express";
import { downloadImage, searchItems } from "../controllers/searchController";

const router = Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Busca itens em uma coleção específica.
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: collection
 *         required: true
 *         description: "Nome da coleção a ser buscada. Exemplo: S2-16D-2, CBERS4, LANDSAT-8."
 *         schema:
 *           type: string
 *           example: "S2-16D-2"
 *       - in: query
 *         name: bbox
 *         required: false
 *         description: "Bounding Box da região de interesse no formato minX,minY,maxX,maxY."
 *         schema:
 *           type: string
 *           example: "-60,-10,-50,-5"
 *       - in: query
 *         name: datetime
 *         required: false
 *         description: "Intervalo de tempo no formato AAAA-MM-DD/AAAA-MM-DD."
 *         schema:
 *           type: string
 *           example: "2023-01-01/2023-12-31"
 *       - in: query
 *         name: limit
 *         required: false
 *         description: "Número máximo de resultados a retornar."
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: "Itens encontrados na coleção."
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
 *                 - id: "S2-16D_V2_018016_20231219"
 *                   collection: "S2-16D-2"
 *                   bbox: [-60, -10, -50, -5]
 *                   datetime: "2023-06-15T00:00:00Z"
 *                   assets:
 *                     B01:
 *                       href: "https://example.com/band_B01.tif"
 *                     B02:
 *                       href: "https://example.com/band_B02.tif"
 *                     thumbnail:
 *                       href: "https://example.com/thumbnail.png"
 *       400:
 *         description: "Parâmetro obrigatório ausente ou mal formatado."
 *         content:
 *           application/json:
 *             example:
 *               error: "O parâmetro 'collection' é obrigatório e deve ser uma string"
 *       500:
 *         description: "Erro interno no servidor."
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro interno no servidor"
 *
 * /search/download:
 *   get:
 *     summary: "Faz o download de uma imagem de satélite com base na coleção, item e banda escolhidos."
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: collection
 *         required: true
 *         description: "Nome da coleção de imagens de satélite."
 *         schema:
 *           type: string
 *           example: "S2-16D-2"
 *       - in: query
 *         name: itemId
 *         required: true
 *         description: "ID do item a ser baixado."
 *         schema:
 *           type: string
 *           example: "S2-16D_V2_018016_20231219"
 *       - in: query
 *         name: band
 *         required: true
 *         description: "Nome da banda espectral da imagem a ser baixada."
 *         schema:
 *           type: string
 *           example: "B08"
 *     responses:
 *       200:
 *         description: "Download bem-sucedido da imagem."
 *         content:
 *           image/tiff:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: "Algum parâmetro obrigatório está faltando."
 *         content:
 *           application/json:
 *             example:
 *               error: "O parâmetro 'band' é obrigatório."
 *       404:
 *         description: "Banda ou item não encontrado."
 *         content:
 *           application/json:
 *             example:
 *               error: "Banda 'B08' não encontrada no item 'S2-16D_V2_018016_20231219'."
 *       500:
 *         description: "Erro ao baixar a imagem."
 *         content:
 *           application/json:
 *             example:
 *               error: "Erro ao baixar a imagem."
 */
router.get("/", searchItems);
router.get("/download", downloadImage);

export default router;
