import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// Estilizando o container para evitar barra de rolagem
const StyledContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  borderRadius: '12px',
  width: '90%',
  boxSizing: 'border-box',
  
}));

// Estilizando o DatePicker
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '90%',
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    width: '100%',
    
    
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#115293',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#0d47a1',
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
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <StyledContainer sx={{
        padding: isMobile ? 1 : 2, // Reduz padding no mobile
        gap: isMobile ? 1.5 : 2,
      }}>
        <CustomDatePicker 
          label="De:" 
          defaultValue={dayjs('2025-04-01')} 
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              fullWidth: true, 
              size: isMobile ? 'small' : 'medium', // Input menor no mobile
              
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
