import { Coordinates } from 'src/core/interfaces/coordinates.interface';

export interface NormalisedLocationData {
  shortAddress: string;
  address: string[];
  locationIsAccurate: boolean;
  coordinates: Coordinates;
}