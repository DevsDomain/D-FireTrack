import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import OccurrenceCard from "./OccurrenceCard";
import DateAndCoordinateFilter from "../DatePicker/DateAndCoordinateFilter"; // 🔥 Corrigido o import
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(true);
  const [schedulesOpen, setSchedulesOpen] = useState(false);
  const [occurrencesOpen, setOccurrencesOpen] = useState(false);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleClose = () => {
    if (isMobile) setOpen(false);
  };

  const handleHomeClick = () => {
    if (isMobile) setOpen(false);
    setSchedulesOpen(false);
    setOccurrencesOpen(false);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    console.log("Datas selecionadas:", dates);
    // Aqui você pode integrar o que quiser: filtros, requisições, etc.
  };

  const handleRegionChange = (latitude: string, longitude: string) => {
    console.log("Coordenadas selecionadas:", latitude, longitude);
    // Aqui também pode acionar funções para buscar dados no mapa, etc.
  };

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
              <li onClick={handleHomeClick}>
                <Link to="/home" className={styles.linkItem}>
                  <HomeIcon fontSize="small" /> HOME
                </Link>
              </li>

              {/* Schedules Section */}
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
                      onDateChange={handleDateChange}
                      onRegionChange={handleRegionChange}
                    />
                  </div>
                </li>
              )}

              {/* Occurrences Section */}
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
                      {/* Lista de OccurrenceCards */}
                      {Array.from({ length: 10 }).map((_, idx) => (
                        <OccurrenceCard
                          key={idx}
                          region="São Paulo - SP"
                          date="15/08/2023"
                          hectares="1250"
                          description="Área de floresta afetada com queimadas externas afetando"
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
