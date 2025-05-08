import { Router } from "express";
import ClassifierController from "../controllers/classifierController";

const classificacaoRoute = Router()


classificacaoRoute.post("/classificacao",ClassifierController.classifyImage);

export default classificacaoRoute