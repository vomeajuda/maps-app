//imports
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGeocode } from '../hooks/useGeocoding';

export function MapComponent() {
  //dimensões da safe area
  const insets = useSafeAreaInsets();

  //coordenadas padrao
  const [region, setRegion] = useState({
    latitude: 47.191644,
    longitude: -52.837208,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [search, setSearch] = useState('');
  const [locationName, setLocationName] = useState('Local atual'); // ✅
  const mapRef = useRef(null);

  //resultado da busca
  const { geocodeAddress } = useGeocode();

  //função de busca
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

    //move o mapa para a nova localizacao
    setRegion(newRegion);
    setLocationName(formattedAddress);
    mapRef.current?.animateToRegion(newRegion, 1000);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.searchContainer, { top: insets.top + 10 }]}>
        {/* campo de busca */}
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          value={search}
          onChangeText={setSearch}
        />
        {/* botao de busca */}
        <TouchableOpacity onPress={handleSearch}>
          <Text>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/*mapa e marcador*/}
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

//estilizacao
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