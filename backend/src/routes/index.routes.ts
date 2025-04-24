import { Router } from "express";
import downloadImageRoute from "./downloadImage.routes";

export const routes = Router()

routes.use("/", downloadImageRoute);
