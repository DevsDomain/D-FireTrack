// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import ReportIcon from '@mui/icons-material/Report';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <Box className="sidebar">
      <List>
        <ListItem className="list-item">
          <Link to="/home" className="sidebar-link">
            <HomeIcon className="sidebar-icon" />
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem className="list-item">
          <Link to="/schedule" className="sidebar-link">
            <EventIcon className="sidebar-icon" />
            <ListItemText primary="Schedule" />
          </Link>
        </ListItem>
        <ListItem className="list-item">
          <Link to="/ocorrencias" className="sidebar-link">
            <ReportIcon className="sidebar-icon" />
            <ListItemText primary="Ocorrências" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;