import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateAndCoordinateFilter from '../DatePicker/DateAndCoordinateFilter';
import OccurrenceCard from '../OcurrenceCard'; // <- Corrigido nome do arquivo

interface Props {
    onDateChange: (dates: [Date | null, Date | null]) => void;
    onRegionChange: (lat: string, lng: string) => void;
}

const Sidebar: React.FC<Props> = ({ onDateChange, onRegionChange }) => {
    const [open, setOpen] = useState(false);
    const [showPeriod, setShowPeriod] = useState(false);
    const [showOccurrences, setShowOccurrences] = useState(false);

    return (
        <>
            {/* Botão flutuante sempre visível */}
            <TouchableOpacity
                style={[
                    styles.menuButton,
                    open ? styles.menuButtonOpen : styles.menuButtonClosed,
                    { position: 'absolute', top: 1, left: 1 },
                ]}
                onPress={() => setOpen(!open)}
                activeOpacity={0.8}
            >
                <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>

            {/* Sidebar */}
            {open && (
                <View style={styles.sidebarContainer}>
                    <ScrollView contentContainerStyle={styles.menuContent}>
                        {/* HOME */}
                        <TouchableOpacity style={styles.item} onPress={() => setOpen(false)}>
                            <Ionicons name="home" size={18} color="#ffffff" />
                            <Text style={styles.itemText}>Home</Text>
                        </TouchableOpacity>

                        {/* PERÍODO */}
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => setShowPeriod(!showPeriod)}
                        >
                            <MaterialIcons name="date-range" size={18} color="#ffffff" />
                            <Text style={styles.itemText}>Período</Text>
                        </TouchableOpacity>

                        {showPeriod && (
                            <View style={{ marginLeft: -10, marginBottom: 20 }}>
                                <DateAndCoordinateFilter
                                    onDateChange={onDateChange}
                                    onRegionChange={onRegionChange}
                                />
                            </View>
                        )}

                        {/* OCORRÊNCIAS */}
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => setShowOccurrences(!showOccurrences)}
                        >
                            <Ionicons name="alert-circle-outline" size={18} color="#ffffff" />
                            <Text style={styles.itemText}>Ocorrências</Text>
                        </TouchableOpacity>

                        {showOccurrences && (
                            <View style={{ marginBottom: 20 }}>
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <OccurrenceCard
                                        key={idx}
                                        region="São Paulo - SP"
                                        date="15/08/2023"
                                        hectares="1250"
                                        description="Área de floresta afetada com queimadas externas afetando vegetação nativa."
                                    />
                                ))}
                            </View>
                        )}
                    </ScrollView>
                </View>
            )}
        </>
    );
};

const sidebarWidthOpen = 220;
const topMenuHeight = 53;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    sidebarContainer: {
        position: 'absolute',
        top: topMenuHeight,
        left: 0,
        width: sidebarWidthOpen,
        height: windowHeight - topMenuHeight,
        backgroundColor: '#2a0236',
        paddingTop: 1,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowRadius: 4,
        elevation: 10,
    },
    menuButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? topMenuHeight + 10 : topMenuHeight + 5,
        left: 10,
        borderRadius: 8,
        zIndex: 1100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButtonClosed: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menuButtonOpen: {
        width: sidebarWidthOpen,
        height: 50,
        backgroundColor: '#2a0236',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuContent: {
        paddingLeft: 10,
        paddingBottom: 130,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 10,
    },
    itemText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginRight: 10,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
    },
    cardText: {
        color: '#333',
        fontWeight: 'bold',
    },
});

export default Sidebar;