import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';

export const useGeocode = () => {
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: { address, key: GOOGLE_MAPS_API_KEY },
        }
      );

      const result = response.data.results[0];
      if (!result) return null;

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