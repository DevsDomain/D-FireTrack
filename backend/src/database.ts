import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
export const dbName = "dfiretracker";
const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);

    const collectionName = "ParaTeste";

    // Verifica se a coleção já existe
    const collections = await db
      .listCollections({}, { nameOnly: true })
      .toArray();
    const collectionExists = collections.some(
      (col) => col.name === collectionName
    );

    if (!collectionExists) {
      await db.createCollection(collectionName);
      console.log(`Coleção '${collectionName}' criada com sucesso!`);
    } else {
      console.log(`Coleção '${collectionName}' já existe.`);
    }

    console.log(`Conectado ao MongoDB! Banco: ${db.databaseName}`);
  } catch (error) {
    console.error("Erro ao conectar ou criar a coleção no MongoDB:", error);
  }
}
