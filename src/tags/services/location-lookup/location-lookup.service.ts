import { HttpService, Injectable } from '@nestjs/common';
import { Coordinates } from 'src/core/interfaces/coordinates.interface';
import { ExternalAccurateGeoData, ExternalAccurateGeoDataResponse } from 'src/core/interfaces/external-accurate-geo-data.interface';
import { ExternalInaccurateGeoData } from 'src/core/interfaces/external-inaccurate-geo-data.interface';
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
    const accurateAddressInfo: ExternalAccurateGeoData | null = await this.getLocationDetailsFromCoordinates(coordinates);
    if (accurateAddressInfo) {
      const fields: Array<keyof ExternalAccurateGeoData> = ['street', 'adminArea6', 'adminArea5', 'adminArea4', 'adminArea3', 'adminArea1', 'postalCode'];

      return {
        shortAddress: `${accurateAddressInfo.adminArea5}, ${accurateAddressInfo.adminArea1}`,
        locationIsAccurate: true,
        address: fields.map((fieldName) => accurateAddressInfo[fieldName] as string).filter(Boolean),
        coordinates: {
          longitude: accurateAddressInfo.latLng.lng.toString(),
          latitude: accurateAddressInfo.latLng.lat.toString()
        }
      };
    }

    const inaccurateAddressInfo: ExternalInaccurateGeoData = await this.getIpLocationData(ip);
    const fields: Array<keyof ExternalInaccurateGeoData> = ['city', 'country_name', 'zip'];

    return {
      shortAddress: `${inaccurateAddressInfo.city}, ${inaccurateAddressInfo.country_code}`,
      locationIsAccurate: false,
      address: fields.map((fieldName) => inaccurateAddressInfo[fieldName] as string).filter(Boolean),
      coordinates: {
        longitude: inaccurateAddressInfo.longitude,
        latitude: inaccurateAddressInfo.latitude
      }
    };
  }

  private async getIpLocationData(ip: string): Promise<ExternalInaccurateGeoData> {
    const accessKey = ConfigService.getIpLookupSecret();
    const url = ExternalEndpoints.IpStack(ip, accessKey);

    const response = await this.httpService.get(url).toPromise();

    return response.data;
  }

  private async getLocationDetailsFromCoordinates(
    coordinates: CreateTagPayload
  ): Promise<ExternalAccurateGeoData | null> {
    if (!coordinates.latitude || !coordinates.latitude) {
      return null;
    }

    const accessKey = ConfigService.getGeolocationLookupSecret();
    const url = ExternalEndpoints.MapQuestReverseGeocode(accessKey, coordinates as Coordinates);

    const response = await this.httpService.get<ExternalAccurateGeoDataResponse>(url).toPromise();

    return response.data?.results?.[0]?.locations?.[0] ?? null;
  }
}
