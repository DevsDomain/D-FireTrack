import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Estilizando o container para evitar barra de rolagem
const StyledContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5', // Cor de fundo clara
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: '12px',
}));

// Estilizando o DatePicker
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2', // Azul padrão do MUI
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#115293', // Azul mais escuro ao passar o mouse
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0d47a1', // Azul ainda mais forte ao focar
  },
  '& .MuiInputLabel-root': {
    color: '#1976d2',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#0d47a1',
  },
}));

export default function DatePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2025-04-30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <StyledContainer>
        <CustomDatePicker 
          label="De:" 
          defaultValue={dayjs('2025-04-01')} 
          format="DD/MM/YYYY"
        />
        <CustomDatePicker
          label="Até:"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
        />
      </StyledContainer>
    </LocalizationProvider>
  );
}