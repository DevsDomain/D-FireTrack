import { processNDVIFromLocalFiles } from "../services/ndviService";
import { generateNDVIImage } from "../services/ndviImageService";
import { classifyNDVIWithKNN } from "../services/knnService";
import { generateClassifiedImage } from "../services/classifiedImage";
import fs from "fs";
import { Request, Response } from "express";
import path from "path";

class ClassifierController {
  async classifyImage(req: Request, res: Response) {
    console.log("BATEU");

    const projectRoot = path.resolve(__dirname, "..", "..");
    const basePath = path.join(projectRoot, "src", "dataOutput");
    const patternsPath = path.join(projectRoot, "src", "data", "patterns.json");

    // These paths can remain static as they are internal temporary files
    const ndviMatrixPath = path.join(basePath, "ndvi_matrix.json");
    const ndviImagePath = path.join(basePath, "ndvi_image.png");
    const classificationOutputPath = path.join(basePath, "classification.json");
    // const classifiedImagePath = path.join(basePath, 'classified_image.png'); // Old static path

    let classifiedImagePath: string; // Declare it here to be assigned later

    try {
      const { redPath, nirPath } = req.body;

      console.log("REDPATH recebido", redPath);
      console.log("nirPath recebido", nirPath);

      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      // --- NEW LOGIC FOR DYNAMIC FILENAME ---
      // Extract the filename from redPath (e.g., CBERS_4_AWFI_20250513_162_105_BAND15.tif)
      const redFilename = path.basename(redPath);
      // Get the part before the last underscore (e.g., CBERS_4_AWFI_20250513_162_105)
      const baseImageName = redFilename.substring(
        0,
        redFilename.lastIndexOf("_")
      );
      // Construct the new classified image path
      classifiedImagePath = path.join(
        basePath,
        `${baseImageName}_classified.png`
      );
      // --- END NEW LOGIC ---

      console.log("Calculando NDVI...");
      const { ndvi } = await processNDVIFromLocalFiles(redPath, nirPath);

      fs.writeFileSync(ndviMatrixPath, JSON.stringify(ndvi, null, 2));

      await generateNDVIImage(ndvi, ndviImagePath);

      const classification = await classifyNDVIWithKNN(ndvi, patternsPath);

      console.log("Salvando classificação...");
      fs.writeFileSync(
        classificationOutputPath,
        JSON.stringify(classification, null, 2)
      );

      console.log("Gerando imagem classificada...");
      // Pass the dynamically generated path to generateClassifiedImage
      const caminhoDaImagemClassificada = await generateClassifiedImage(
        classification,
        classifiedImagePath
      );

      console.log(
        "Processo concluído. Matriz NDVI, imagem NDVI, classificação e imagem classificada salvas."
      );

      res.status(200).json({ imageUrl: caminhoDaImagemClassificada });
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro no processamento da imagem." }); // Added error response
    }
  }
}

export default new ClassifierController();
