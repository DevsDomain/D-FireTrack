import { Router } from "express";
import downloadImageRoute from "./downloadImage.routes";
import listarImageRoute from "./listarImage.routes";

export const routes = Router()

routes.use("/", downloadImageRoute);
routes.use("/", listarImageRoute)
