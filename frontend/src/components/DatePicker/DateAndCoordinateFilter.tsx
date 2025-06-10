import * as React from "react";
import { useState, useEffect } from "react";
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
  externalLat?: string;
  externalLng?: string;
}

const StyledContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: "12px",
  width: "90%",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    width: "60%",
    padding: theme.spacing(1),
    gap: theme.spacing(1.5),
  },
}));

const StyledTextFieldProps = {
  fullWidth: true,
  size: "small" as "small",
  sx: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#115293",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0d47a1",
    },
    "& .MuiInputLabel-root": {
      color: "#1976d2",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#0d47a1",
    },
    "& .MuiSvgIcon-root": {
      color: "#1976d2",
    },
  },
};

const CoordinateInputs = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
}));

const InputField = styled("input")(({ theme }) => ({
  width: "90%",
  maxWidth: "200px",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #1976d2",
  borderRadius: "6px",
  backgroundColor: "#ffffff",
  color: "#333",
  "&::placeholder": {
    color: "#999",
  },

  [theme.breakpoints.down("sm")]: {
    width: "125px",
    fontSize: "12px",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: "12px",
}));

export default function DateAndCoordinateFilter({
  onDateChange,
  onRegionChange,
  externalLat,
  externalLng,
}: DateAndCoordinateFilterProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (externalLat) setLatitude(externalLat);
    if (externalLng) setLongitude(externalLng);
  }, [externalLat, externalLng]);

  const handleSubmit = () => {
    if (startDate && endDate && latitude && longitude) {
      onDateChange([startDate.toDate(), endDate.toDate()]);
      onRegionChange(latitude, longitude);
      navigate("/gallery");
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
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
            onKeyDown={handleKeyDown}
          />
          <InputField
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </CoordinateInputs>

        <SubmitButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Buscar
        </SubmitButton>
      </StyledContainer>
    </LocalizationProvider>
  );
}
