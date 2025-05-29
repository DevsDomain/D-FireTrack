import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopMenu from "../components/TopMenu"; // Se for compatível com RN
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar/Sidebar";

const Stack = createStackNavigator();

const App = () => {
  // Estados para as props que o Home espera
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([null, null]);
  const [region, setRegion] = useState<{ lat: string; lng: string }>({ lat: "", lng: "" });

  // Opcional: você pode manter bbox e datetime se usar para outro propósito
  // const [bbox, setBbox] = useState("-60.1,-3.2,-48.4,-1.4");
  // const [datetime, setDatetime] = useState("2024-03-01/2024-12-31");

  const handleSelect = async (selectedIds: string[]) => {
    console.log("🖼️ Imagens selecionadas:", selectedIds);
    // axios funciona normalmente
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);

    // Se quiser manter datetime como string para outro uso:
    /*
    if (dates[0] && dates[1]) {
      const start = dates[0].toISOString().split("T")[0];
      const end = dates[1].toISOString().split("T")[0];
      setDatetime(`${start}/${end}`);
    }
    */
  };

  const handleRegionChange = (latitude: string, longitude: string) => {
    setRegion({ lat: latitude, lng: longitude });

    // Se quiser calcular bbox para outro uso:
    /*
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const delta = 0.5;
    const bboxString = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
    setBbox(bboxString);
    */
  };

  return (
    <NavigationContainer>
      {/* Se TopMenu for um componente fixo, pode ser colocado fora da stack */}
      <TopMenu />
      <Sidebar onDateChange={handleDateChange} onRegionChange={handleRegionChange} />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {() => <Home selectedDates={selectedDates} region={region} />}
        </Stack.Screen>
        {/* Outras telas aqui */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;