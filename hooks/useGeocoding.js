//imports
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';

//funcao da pesquisa
export const useGeocode = () => {
  const geocodeAddress = async (address) => {
    try {
      //chama a api do google passando o endereco e a chave
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: { address, key: GOOGLE_MAPS_API_KEY },
        }
      );

      //aguarda e verifica o resultado
      console.log(response.data);
      const result = response.data.results[0];
      if (!result) return null;

      //retorna as novas coordenadas e endereco
      return {
        location: result.geometry.location,
        formattedAddress: result.formatted_address,
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  return { geocodeAddress };
};