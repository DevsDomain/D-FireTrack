import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BorderColor } from '@mui/icons-material';

// Estilizando o container principal
const StyledContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  padding: theme.spacing(2),
  backgroundColor: '#1f1f2f',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: '12px',
  width: '100%',
  boxSizing: 'border-box',
}));

// Estilizando o DatePicker
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    backgroundColor: '#1f1f2f',
    color: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #ffffff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#cccccc',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ffffff',
  },
  '& .MuiSvgIcon-root': {
    color: '#ffffff',
  },
  // Estilizando o Popper (o calendário)
  '& .MuiPaper-root': {
    backgroundColor: '#1f1f2f', // Fundo do calendário
    color: '#ffffff', // Texto branco
    border: '1px solid #ffffff',
  },
  '& .MuiPickersDay-root': {
    color: '#ffffff', // Números dos dias brancos
    borderColor: '#ffffff',
  },
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: '#1976d2', // Azul padrão para dia selecionado
    color: '#ffffff', // Texto do dia selecionado
  },
  '& .MuiPickersDay-root:hover': {
    backgroundColor: '#333', // Hover dos dias
  },
  '& .MuiDayCalendar-weekDayLabel': {
    color: '#ffffff', // Letras dos dias da semana (S, T, Q, etc.)
  },
}));

export default function DatePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2025-04-30'));
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <StyledContainer sx={{
        padding: isMobile ? 1 : 2,
        gap: isMobile ? 1.5 : 2,
      }}>
        <CustomDatePicker 
          label="De:" 
          defaultValue={dayjs('2025-04-01')} 
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              fullWidth: true,
              size: isMobile ? 'small' : 'medium',
            }
          }}
        />
        <CustomDatePicker
          label="Até:"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              fullWidth: true,
              size: isMobile ? 'small' : 'medium',
            }
          }}
        />
      </StyledContainer>
    </LocalizationProvider>
  );
}