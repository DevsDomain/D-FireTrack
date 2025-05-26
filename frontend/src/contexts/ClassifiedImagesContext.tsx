import React, { createContext, useState, useContext } from "react";

export interface ClassifiedImage {
  uri: string;
  label: string;
  location: { latitude: number; longitude: number };
}

interface ClassifiedImagesContextData {
  images: ClassifiedImage[];
  addImage: (image: ClassifiedImage) => void;
}

const ClassifiedImagesContext = createContext<ClassifiedImagesContextData>({
  images: [],
  addImage: () => {},
});

export const ClassifiedImagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [images, setImages] = useState<ClassifiedImage[]>([]);

  const addImage = (image: ClassifiedImage) => {
    setImages((prev) => [...prev, image]);
  };

  return (
    <ClassifiedImagesContext.Provider value={{ images, addImage }}>
      {children}
    </ClassifiedImagesContext.Provider>
  );
};

export const useClassifiedImages = () => useContext(ClassifiedImagesContext);
