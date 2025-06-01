// frontend/src/contexts/ClassifiedImagesContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface ClassifiedImage {
  uri: string;
  label: string;
  location: { latitude: number; longitude: number };
}

interface ClassifiedImagesContextData {
  images: ClassifiedImage[];
  setImages: (images: ClassifiedImage[]) => void;
  addImage: (image: ClassifiedImage) => void;
}

const ClassifiedImagesContext = createContext<ClassifiedImagesContextData>({
  images: [],
  setImages: () => {},
  addImage: () => {},
});

export const ClassifiedImagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImagesState] = useState<ClassifiedImage[]>([]);

  const setImagesContext = (newImages: ClassifiedImage[]) => {
    setImagesState(newImages);
  };

  const addImageContext = (image: ClassifiedImage) => {
    // Evita adicionar imagens duplicadas pela URI, se necessário
    // if (images.find(img => img.uri === image.uri)) {
    //   console.log("Imagem já existe:", image.uri);
    //   return;
    // }
    setImagesState((prev) => [...prev, image]);
    console.log("Imagem adicionada ao contexto:", image);
    console.log("Estado atual das imagens no contexto:", [...images, image]);
  };

  return (
    <ClassifiedImagesContext.Provider
      value={{ images, setImages: setImagesContext, addImage: addImageContext }}
    >
      {children}
    </ClassifiedImagesContext.Provider>
  );
};

export const useClassifiedImages = () => useContext(ClassifiedImagesContext);
