import * as React from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

interface DateAndCoordinateFilterProps {
  onDateChange: (dates: [Date | null, Date | null]) => void;
  onRegionChange: (lat: string, lng: string) => void;
}

// Estilizando o container principal
const StyledContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  padding: "2vh 2vw", // substitui theme.spacing(2)
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  gap: "2vh", // substitui theme.spacing(2)
  borderRadius: "1.2vw", // proporcional a 12px
  width: "90%",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    width: "60%",
    padding: "1vh 1vw", // substitui theme.spacing(1)
    gap: "1.5vh",       // substitui theme.spacing(1.5)
  },
}));

// Estilizando os TextFields dos DatePickers
const StyledTextFieldProps = {
  fullWidth: true,
  size: "small" as "small",
  sx: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5555DD",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5555DD",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5555DD",
    },
    "& .MuiInputLabel-root": {
      color: "#5555DD",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#5555DD",
    },
    "& .MuiSvgIcon-root": {
      color: "#5555DD",
    },
  },
};

// Estilizando os inputs de Latitude e Longitude
const CoordinateInputs = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1vh", // proporcional a 8px
  alignItems: "center",
}));

const InputField = styled("input")(({ theme }) => ({
  width: "90%",
  maxWidth: "20vw", // proporcional a 200px
  padding: "1vh 1vw", // proporcional a 8px
  fontSize: "1vw", // proporcional a 14px
  border: "0.1vw solid #5555DD", // proporcional a 1px
  borderRadius: "0.6vw", // proporcional a 6px
  backgroundColor: "#ffffff",
  color: "#5555DD",
  "&::placeholder": {
    color: "#999",
  },

  [theme.breakpoints.down("sm")]: {
    width: "30vw",     // proporcional a 125px
    fontSize: "2.5vw", // proporcional a 12px
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: "1.2vh", // proporcional a 12px
}));

export default function DateAndCoordinateFilter({
  onDateChange,
  onRegionChange,
}: DateAndCoordinateFilterProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate(); // 👈 INICIALIZA O HOOK

  const isMobile = useMediaQuery("(max-width:768px)");

  const handleSubmit = () => {
    if (startDate && endDate && latitude && longitude) {
      onDateChange([startDate.toDate(), endDate.toDate()]);
      onRegionChange(latitude, longitude);
      navigate("/gallery"); // 👈 NAVEGA PARA A GALERIA
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <StyledContainer>
        {isMobile ? (
          <>
            <MobileDatePicker
              label="Data Início"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="DD/MM/YY"
              slotProps={{ textField: StyledTextFieldProps }}
            />
            <MobileDatePicker
              label="Data Fim"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="DD/MM/YY"
              slotProps={{ textField: StyledTextFieldProps }}
            />
          </>
        ) : (
          <>
            <DesktopDatePicker
              label="Data Início"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="DD/MM/YYYY"
              slotProps={{ textField: StyledTextFieldProps }}
            />
            <DesktopDatePicker
              label="Data Fim"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="DD/MM/YYYY"
              slotProps={{ textField: StyledTextFieldProps }}
            />
          </>
        )}

        <CoordinateInputs>
          <InputField
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </CoordinateInputs>

        <SubmitButton
  variant="contained"
  onClick={handleSubmit}
  sx={{
    backgroundColor: '#5555DD',
    '&:hover': {
      backgroundColor: '#4444cc',
    },
  }}
>
          Buscar
        </SubmitButton>
      </StyledContainer>
    </LocalizationProvider>
  );
}
