import mongoose, { Model, Mongoose, Schema } from "mongoose";

export interface ImagemClassificada {
  id: mongoose.Types.ObjectId;
  image: string;
  path: string;
  xcoord: string;
  ycoord: string;
  date: string
}

const ImagemClassificada = new Schema<ImagemClassificada>({
  id: mongoose.Types.ObjectId,
  image: { type: String, required: true },
  path: { type: String },
  xcoord: { type: String, required: true },
  ycoord: { type: String, required: true },
  date: { type: String, required: true }
});

const ImagemClassificadaModel: Model<ImagemClassificada> =
  mongoose.model<ImagemClassificada>(
    "ImagemClassificada",
    ImagemClassificada
  );

export default ImagemClassificadaModel;
