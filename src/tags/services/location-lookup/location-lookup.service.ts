import { HttpService, Injectable } from '@nestjs/common';
import { Coordinates } from 'src/core/interfaces/coordinates.interface';
import { GeocodedCoordinateData, GeocodedCoordinateExternalApiResponse } from 'src/core/interfaces/geocoded-coordinate-data.interface';
import { IpLookupData } from 'src/core/interfaces/ip-lookup-data.interface';
import { ConfigService } from 'src/core/services/config/config.service';
import { ExternalEndpoints } from 'src/shared/constants/external-endpoints.constant';
import { CreateTagPayload } from 'src/tags/dto/create-tag-payload.dto';
import { NormalisedLocationData } from 'src/tags/interfaces/normalised-location-data.interface';

@Injectable()
export class LocationLookupService {
  constructor(private httpService: HttpService) {}

  public async getLocationData(
    ip: string,
    coordinates: CreateTagPayload
  ): Promise<NormalisedLocationData> {
    const accurateAddressInfo: GeocodedCoordinateData | null = await this.getLocationDetailsFromCoordinates(coordinates);
    const inaccurateAddressInfo: IpLookupData = await this.getIpLocationData(ip);

    if (accurateAddressInfo) {
      const fields: Array<keyof GeocodedCoordinateData> = ['street', 'adminArea6', 'adminArea5', 'adminArea4', 'adminArea3', 'adminArea1', 'postalCode'];

      return {
        accurate: true,
        address: fields.map((fieldName) => accurateAddressInfo[fieldName] as string).filter(Boolean),
        coordinates: {
          longitude: accurateAddressInfo.latLng.lng.toString(),
          latitude: accurateAddressInfo.latLng.lat.toString()
        }
      };
    }

    const fields: Array<keyof IpLookupData> = ['city', 'country_name', 'zip'];

    return {
      accurate: false,
      address: fields.map((fieldName) => inaccurateAddressInfo[fieldName] as string).filter(Boolean),
      coordinates: {
        longitude: inaccurateAddressInfo.longitude,
        latitude: inaccurateAddressInfo.latitude
      }
    };
  }

  private async getIpLocationData(ip: string): Promise<IpLookupData> {
    const accessKey = ConfigService.getIpLookupSecret();
    const url = ExternalEndpoints.IpStack(ip, accessKey);

    const response = await this.httpService.get(url).toPromise();

    return response.data;
  }

  private async getLocationDetailsFromCoordinates(
    coordinates: CreateTagPayload
  ): Promise<GeocodedCoordinateData | null> {
    if (!coordinates.latitude || !coordinates.latitude) {
      return null;
    }

    const accessKey = ConfigService.getGeolocationLookupSecret();
    const url = ExternalEndpoints.MapQuestReverseGeocode(accessKey, coordinates as Coordinates);

    const response = await this.httpService.get<GeocodedCoordinateExternalApiResponse>(url).toPromise();

    return response.data?.results?.[0]?.locations?.[0] ?? null;
  }
}
