import React from 'react';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TopMenu = () => {
  return (
    <Box
      sx={{
        height: '8vh', // proporcional à altura da tela
        backgroundColor: '#5555DD',
        color: '#FFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2vw', // padding responsivo
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 500,
        boxShadow: '0 0.3vh 1vh rgba(0, 0, 0, 0.815)',
        flexWrap: 'nowrap',
        gap: { xs: '1vw', md: '2vw' },
      }}
    >
      {/* Logo e título */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            marginLeft: '1vw',
            fontSize: { xs: '2.5vw', md: '1.3vw' }, // responsivo
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
            fontSize: { xs: '2.5vw', md: '1.3vw' },
            display: 'flex',
            alignItems: 'center',
            gap: '1vw',
            whiteSpace: { xs: 'normal', md: 'nowrap' },
            lineHeight: 1.2,
          }}
        >
          <Box
            sx={{
              width: '0.6vw',
              height: '0.6vw',
              backgroundColor: '#a855f7',
              borderRadius: '50%',
              display: 'inline-block',
              minWidth: '6px', // para não sumir em telas muito pequenas
              minHeight: '6px',
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
            borderRadius: '0.8vw',
            width: { xs: '25vw', sm: '30vw', md: '20vw' }, // responsivo
            backgroundColor: '#ffffff',
            ml: { xs: '1vw', md: '2vw' },
            '& .MuiInputBase-input': {
              color: '#333',
              fontSize: { xs: '2.5vw', md: '1vw' },
              padding: '1vh',
              marginRight: '1vw',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e0d4f7',
              },
              '&:hover fieldset': {
                borderColor: '#c084fc',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#a78bfa',
              fontSize: { xs: '2.5vw', md: '1vw' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#a78bfa', fontSize: { xs: '4vw', md: '1.5vw' } }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default TopMenu;