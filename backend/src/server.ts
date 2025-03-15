import express from "express";
import { connectDB } from './database';

connectDB();

const app = express();
const PORT = 3000;

//inserir uma requisicao
app.get("/", (req, res) => {
  res.send("Hello, Backend com TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//FD