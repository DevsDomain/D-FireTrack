import React from 'react';
import { Box, TextField, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Ícone de lupa
import Fire from '../assets/fire.png'; // Importando a imagem

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
        padding: '0 20px',
        position: 'fixed', // Fixa no topo
        top: 0,
        left: 0,
        width: '100%', // Ocupa toda a largura
        zIndex: 500, // Garante que fique acima de outros elementos
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.671)', // Adiciona sombra
      }}
    >
      {/* Logo e título */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={Fire} // Usando a imagem importada
          alt="Logo"
          style={{ height: '40px', marginRight: '10px' }}
        />
        <h2 style={{ margin: 0 }}>D-Tracker Fire</h2>
      </Box>

      {/* Texto centralizado com a bolinha azul */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: 'blue',
            borderRadius: '50%',
            marginRight: '8px',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Visualizador de Cicatrizes de Queimadas
        </Typography>
      </Box>

      {/* Campo de busca */}
      <TextField
        variant="outlined"
        placeholder="Buscar localização..."
        sx={{
          borderRadius: '10px',
          width: '200px',
          backgroundColor: 'black',
          marginRight: '25px', // Empurra para a esquerda
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#ced2da',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: '#ced2da' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TopMenu;