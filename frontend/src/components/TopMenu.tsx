import React from 'react';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Fire from '../assets/fire.png';

const TopMenu = () => {
  return (
    <Box
      sx={{
        height: 60,
        backgroundColor: '#2D2F39',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 500,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.671)',
        flexWrap: 'nowrap',
        gap: { xs: '5px', md: '20px' },
      }}
    >
      {/* Logo e título */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src={Fire}
          alt="Logo"
          style={{ height: '30px' }} // TIREI marginRight aqui!
        />
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            marginLeft: '5px', // Pequeno espaço para não grudar
            fontSize: { xs: '12px', md: '20px' }
          }}
        >
          D-Tracker Fire
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
              backgroundColor: 'blue',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
          Visualizador de <br /> Cicatrizes de Queimadas
        </Typography>
      </Box>

      {/* Campo de busca */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          sx={{
            borderRadius: '10px',
            width: { xs: '120px', sm: '180px', md: '250px' },
            backgroundColor: 'black',
            ml: { xs: 1, md: 2 }, // marginLeft no campo de busca
            '& .MuiInputBase-input': {
              color: 'white',
              fontSize: { xs: '10px', md: '16px' },
              padding: '8px',
              marginRight: '5px'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#ced2da',
              fontSize: { xs: '10px', md: '16px' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: '#ced2da', fontSize: { xs: '18px', md: '24px' } }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default TopMenu;
