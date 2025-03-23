import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "STAC API - INPE",
      version: "1.0.0",
    },
  },
  apis: [path.join(__dirname, "./routes/*.ts")], // Caminho absoluto
};

export const swaggerSpec = swaggerJSDoc(options);
