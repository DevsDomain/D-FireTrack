import React, { useState, useEffect, useCallback } from "react";
import styles from "./Sidebar.module.css";
import OccurrenceCard from "./OccurrenceCard";
import DateAndCoordinateFilter from "../DatePicker/DateAndCoordinateFilter";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

interface SidebarProps {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  onRegionChange: (latitude: string, longitude: string) => void;
  onSelectImage?: (occurrence: any) => void;
  externalLat?: string;
  externalLng?: string;
}


interface Occurrence {
  _id: string;
  image: string;
  xcoord: string;
  ycoord: string;
  date: string;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

const Sidebar: React.FC<SidebarProps> = ({
  onDateChange,
  onRegionChange,
  onSelectImage,
  externalLat,
  externalLng,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(true);
  const [schedulesOpen, setSchedulesOpen] = useState(false);
  const [occurrencesOpen, setOccurrencesOpen] = useState(false);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [selectedOccurrence, setSelectedOccurrence] =
    useState<Occurrence | null>(null);

  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        const res = await fetch("http://localhost:3010/api/list");
        const data = await res.json();

        const parsed = data.map((occ: Occurrence) => ({
          ...occ,
          image: occ.image.split("/").pop() || "", // pega apenas o nome do arquivo
        }));

        setOccurrences(parsed);
      } catch (err) {
        console.error("Erro ao buscar ocorrências:", err);
      }
    };

    fetchOccurrences();
  }, []);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleClose = () => {
    if (isMobile) setOpen(false);
  };

  const handleSelectOccurrence = useCallback(
    (occ: Occurrence) => {
      setSelectedOccurrence(occ);
      if (onSelectImage) onSelectImage(occ);
    },
    [onSelectImage]
  );

  return (
    <>
      {isMobile && !open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 2000,
            backgroundColor: "#2c2c3f",
            color: "white",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {open && (
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            <ul>
              <li
                onClick={() => {
                  handleClose();
                  setOccurrencesOpen(false);
                  setSchedulesOpen(false);
                }}
                className={styles.clickableItem}
              >
                <Link to="/home" className={styles.linkItem}>
                  <HomeIcon fontSize="small" /> HOME
                </Link>
              </li>

              {/* Seção Período */}
              <li
                onClick={() => setSchedulesOpen(!schedulesOpen)}
                className={styles.clickableItem}
              >
                <EventNoteIcon fontSize="small" />
                Período
                <div className={styles.sectionHeader}>
                  {schedulesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
              </li>

              {schedulesOpen && (
                <li>
                  <div className={styles.sectionContent}>
                    <DateAndCoordinateFilter
                       onDateChange={onDateChange}
                       onRegionChange={onRegionChange}
                       externalLat={externalLat}
                       externalLng={externalLng}
                    />
                  </div>
                </li>
              )}

              {/* Seção Ocorrência */}
              <li
                onClick={() => setOccurrencesOpen(!occurrencesOpen)}
                className={styles.clickableItem}
              >
                <EventNoteIcon fontSize="small" />
                Ocorrência
                <div className={styles.sectionHeader}>
                  {occurrencesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </div>
              </li>

              {occurrencesOpen && (
                <li>
                  <div className={styles.sectionContent}>
                    <div className={styles.occurrencesScrollContainer}>
                      {occurrences.map((occ) => (
                        <OccurrenceCard
                          key={occ._id}
                          date={occ.date || "Data desconhecida"}
                          xcoord={occ.xcoord || "?"}
                          ycoord={occ.ycoord || "?"}
                          imageUrl={`http://localhost:3333/classified-images/${occ.image}`}
                          onShowOnMap={() => {
                            setSelectedOccurrence(occ); // <<<<<< Atualiza o estado aqui
                            if (onSelectImage) onSelectImage(occ);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
