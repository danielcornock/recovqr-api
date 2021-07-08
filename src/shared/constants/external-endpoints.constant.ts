import { Coordinates } from 'src/core/interfaces/coordinates.interface';

export const ExternalEndpoints = {
  IpStack: (ipAddress: string, secret: string): string => `http://api.ipstack.com/${ipAddress}?access_key=${secret}`,
  MapQuestReverseGeocode: (secret: string, { longitude, latitude }: Coordinates): string => `http://www.mapquestapi.com/geocoding/v1/reverse?key=${secret}&location=${latitude},${longitude}`
};