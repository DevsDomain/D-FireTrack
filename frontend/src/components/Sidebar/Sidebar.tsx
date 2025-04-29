import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import OccurrenceCard from "./OccurrenceCard";
import DateAndCoordinateFilter from "../DatePicker/DateAndCoordinateFilter";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton, useMediaQuery } from "@mui/material";

// 👇 Adiciona as props esperadas
interface SidebarProps {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  onRegionChange: (latitude: string, longitude: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDateChange, onRegionChange }) => {
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
              <li onClick={handleClose}>
                <HomeIcon fontSize="small" /> HOME
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
