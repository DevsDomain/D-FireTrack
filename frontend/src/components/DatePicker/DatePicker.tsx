import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// Estilizando o container do Sidebar
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

  [theme.breakpoints.down('sm')]: {
    width: '60%',        // 🔥 No MOBILE (sm = até 600px) fica 100%
    padding: theme.spacing(1), // 🔥 Padding menor no mobile
    gap: theme.spacing(1.5),   // 🔥 Gap menor no mobile
  },
}))

// Estilizando os campos de input dos DatePickers
const StyledTextFieldProps = {
  fullWidth: true,
  size: 'small' as 'small', // ✅ Corrigido o tipo para TypeScript
  sx: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#115293',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0d47a1',
    },
    '& .MuiInputLabel-root': {
      color: '#1976d2',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#0d47a1',
    },
    '& .MuiSvgIcon-root': {
      color: '#1976d2',
    },
  },
};

export default function DatePickerValue() {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs('2025-04-01'));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs('2025-04-30'));

  const isMobile = useMediaQuery('(max-width:10px)');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <StyledContainer>
        {isMobile ? (
          <>
            {/* MobileDatePicker para celulares */}
            <MobileDatePicker
              label="De:"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="DD/MM/YY"
              slotProps={{
                textField: StyledTextFieldProps
              }}
            />
            <MobileDatePicker
              label="Até:"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="DD/MM/YY"
              slotProps={{
                textField: StyledTextFieldProps
              }}
            />
          </>
        ) : (
          <>
            {/* DesktopDatePicker para computadores */}
            <DesktopDatePicker
              label="De:"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="DD/MM/YY"
              slotProps={{
                textField: StyledTextFieldProps
              }}
            />
            <DesktopDatePicker
              label="Até:"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="DD/MM/YY"
              slotProps={{
                textField: StyledTextFieldProps
              }}
            />
          </>
        )}
      </StyledContainer>
    </LocalizationProvider>
  );
}
