import React from 'react';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Fire from '../assets/fire.png';

const TopMenu = () => {
  return (
    <Box
      sx={{
        height: 60,
        backgroundColor: '#5555DD', // lilás claro (tema claro)
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 500,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.815)', // sombra mais visível e moderna
        flexWrap: 'nowrap',
        gap: { xs: '5px', md: '20px' },
      }}
    >
      {/* Logo e título */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            marginLeft: '5px',
            fontSize: { xs: '12px', md: '20px' }
          }}
        >
          🛰️ Mobile Scars
        </Typography>
      </Box>

      {/* Texto centralizado */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '10px', md: '20px' },
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: { xs: 'normal', md: 'nowrap' },
            lineHeight: 1.2,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: '#a855f7', // ponto lilás
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
          Visualizador de <br /> Cicatrizes de Queimadas
        </Typography>
      </Box>

      {/* Campo de busca */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          sx={{
            borderRadius: '10px',
            width: { xs: '120px', sm: '180px', md: '250px' },
            backgroundColor: '#ffffff',
            ml: { xs: 1, md: 2 },
            '& .MuiInputBase-input': {
              color: '#333',
              fontSize: { xs: '10px', md: '16px' },
              padding: '8px',
              marginRight: '5px'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e0d4f7',
              },
              '&:hover fieldset': {
                borderColor: '#c084fc',
              }
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#a78bfa',
              fontSize: { xs: '10px', md: '16px' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#a78bfa', fontSize: { xs: '18px', md: '24px' } }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default TopMenu;
