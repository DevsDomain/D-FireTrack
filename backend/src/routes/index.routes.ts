import { Router } from "express";
import apontamentoRoute from "./apontamento.routes";

export const routes = Router()

routes.use("/apontamento", apontamentoRoute);
