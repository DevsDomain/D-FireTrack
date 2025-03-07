import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import collectionsRoutes from "./routes/collections";
import searchRoutes from "./routes/search";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Documentação OpenAPI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/collections", collectionsRoutes);
app.use("/search", searchRoutes);

// Middleware Global de Erros (deve ser o último!)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
