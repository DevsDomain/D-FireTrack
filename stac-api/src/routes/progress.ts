// src/routes/progress.ts
import express from "express";
import { progressEmitter } from "../events/progressEmitter";

const progressRoute = express.Router();

progressRoute.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const onProgress = (percentage: string) => {
    res.write(`data: ${percentage}\n\n`);
  };

  progressEmitter.on("progress", onProgress);

  req.on("close", () => {
    progressEmitter.off("progress", onProgress);
  });
});

export default progressRoute;
