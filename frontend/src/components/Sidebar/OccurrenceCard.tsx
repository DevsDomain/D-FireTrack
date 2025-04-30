import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import styles from './Sidebar.module.css';

interface Props {
  region: string;
  date: string;
  hectares: string;
  description: string;
}

const OccurrenceCard: React.FC<Props> = ({ region, date, hectares, description }) => {
  return (
    <div className={styles.card}>
      <h2>{region}</h2>
      <p>{date} - {hectares} hectares</p>
      <p className={styles.description}>{description}</p>
      <button className={styles.download}><DownloadIcon fontSize="small" /> Download</button>
    </div>
  );
};

export default OccurrenceCard;