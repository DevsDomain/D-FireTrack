import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import MapIcon from "@mui/icons-material/Map";
import styles from "./Sidebar.module.css";

interface Props {
  date: string;
  xcoord: string;
  ycoord: string;
  imageUrl: string;
  onShowOnMap: () => void;
}

const OccurrenceCard: React.FC<Props> = ({
  date,
  xcoord,
  ycoord,
  imageUrl,
  onShowOnMap,
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "classified_image.png";
    link.click();
  };

  return (
    <div className={styles.card}>
      <h2>
        Órbita Ponto: {xcoord}, {ycoord}
      </h2>
      <p>Data: {date}</p>
      <div className={styles.cardActions}>
        <button className={styles.download} onClick={handleDownload}>
          <DownloadIcon fontSize="small" /> Download
        </button>
        <button
          className={styles.mapButton}
          onClick={() => {
            console.log("📍 Clicado botão Ver no Mapa");
            onShowOnMap();
          }}
        >
          <MapIcon fontSize="small" /> Ver no Mapa
        </button>
      </div>
    </div>
  );
};

export default OccurrenceCard;
