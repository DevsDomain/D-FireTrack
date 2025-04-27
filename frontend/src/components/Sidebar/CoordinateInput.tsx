import React, { JSX, useState } from "react";
import styles from "./CoordinateInput.module.css"; // Importa CSS Module
import longitudeImg from "../../assets/longitude.png"; // Importando a imagem

export default function CoordinateInput(): JSX.Element {
  const [norte, setNorte] = useState<string>("-5.5613");
  const [sul, setSul] = useState<string>("-14.8722");
  const [oeste, setOeste] = useState<string>("-65.7016");
  const [leste, setLeste] = useState<string>("-49.3409");

  return (
    <div className={styles.coordinateContainer}>
      <div className={styles.coordinateBox}>
        {/* Imagem centralizada */}
        <img src={longitudeImg} alt="Longitude" className={styles.coordinateImage} />

        {/* Inputs */}
        <input
          type="text"
          value={norte}
          onChange={(e) => setNorte(e.target.value)}
          className={`${styles.inputCoordinate} ${styles.norte}`}
        />
     

        <input
          type="text"
          value={sul}
          onChange={(e) => setSul(e.target.value)}
          className={`${styles.inputCoordinate} ${styles.sul}`}
        />
     

        <input
          type="text"
          value={leste}
          onChange={(e) => setLeste(e.target.value)}
          className={`${styles.inputCoordinate} ${styles.leste}`}
        />


        <input
          type="text"
          value={oeste}
          onChange={(e) => setOeste(e.target.value)}
          className={`${styles.inputCoordinate} ${styles.oeste}`}
        />

      </div>
    </div>
  );
}
