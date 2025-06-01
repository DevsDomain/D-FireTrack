import mongoose, { Model, Schema } from "mongoose";

export interface ImagemClassificada {
  id: mongoose.Types.ObjectId;
  image: string;
  path: string;
  xcoord: string;
  ycoord: string;
  date: string
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  }
}

const ImagemClassificada = new Schema<ImagemClassificada>({
  id: mongoose.Types.ObjectId,
  image: { type: String, required: true },
  path: { type: String },
  xcoord: { type: String, required: true },
  ycoord: { type: String, required: true },
  date: { type: String, required: true },
  geometry: {
    type: {
      type: String, enum: ['Polygon'], required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  }

});


ImagemClassificada.index({ geometry: '2dsphere' });

const ImagemClassificadaModel: Model<ImagemClassificada> =
  mongoose.model<ImagemClassificada>(
    "ImagemClassificada",
    ImagemClassificada
  );

export default ImagemClassificadaModel;
