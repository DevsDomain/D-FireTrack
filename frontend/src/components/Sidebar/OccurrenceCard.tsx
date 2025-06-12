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
  const handleOpenInNewTab = () => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div className={styles.card}>
      <h2>Órbita Ponto: {xcoord}, {ycoord}</h2>
      <p className={styles.description}>Data: {date}</p>
      
      <div className={styles.cardActions}>
        <button className={styles.downloadBtn} onClick={handleOpenInNewTab}>
          <DownloadIcon fontSize="small" /> Download 
        </button>

        <button className={styles.mapBtn} onClick={onShowOnMap}>
          <MapIcon fontSize="small" /> Ver no Mapa
        </button>
      </div>
    </div>
  );
};

export default OccurrenceCard;