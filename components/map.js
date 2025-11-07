import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useGeocode } from '../hooks/useGeocoding';

export function MapComponent() {
  const insets = useSafeAreaInsets();

  const [region, setRegion] = useState({
    latitude: 47.191644,
    longitude: -52.837208,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');
  const [locationName, setLocationName] = useState('Local atual'); // ✅
  const mapRef = useRef(null);

  const { geocodeAddress } = useGeocode();

  const handleSearch = async () => {
    if (!search.trim()) return;

    const result = await geocodeAddress(search);

    if (!result) {
      Alert.alert('Local não encontrado', 'Tente outro nome.');
      return;
    }

    const { location, formattedAddress } = result;
    const newRegion = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setRegion(newRegion);
    setLocationName(formattedAddress);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.searchContainer, { top: insets.top + 10 }]}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Text>Buscar</Text>
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
      >
        <Marker
          coordinate={{ latitude: region.latitude, longitude: region.longitude }}
          title={locationName}
          description="Resultado da pesquisa"
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
  },
  map: {
    flex: 1,
  },
});