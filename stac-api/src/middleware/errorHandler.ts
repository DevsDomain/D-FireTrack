import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Erro interno:", err); // Log do erro no console

  res.status(500).json({
    error: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
  });
};
