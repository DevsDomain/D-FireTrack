import { Router } from "express";
import { getCollections } from "../controllers/collectionsController";

const router = Router();

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Lista todas as coleções disponíveis no STAC.
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: Lista de coleções.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 collections:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       description:
 *                         type: string
 *       500:
 *         description: Erro ao buscar coleções.
 */
router.get("/", getCollections);

export default router;
