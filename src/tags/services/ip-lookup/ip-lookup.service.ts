import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/core/services/config/config.service';
import { IpLookupResponse } from 'src/information/interfaces/ip-lookup-response.interface';
import { ExternalEndpoints } from 'src/shared/constants/external-endpoints.constant';

@Injectable()
export class IpLookupService {
  constructor(private httpService: HttpService) {}

  public async getIpLocationData(ip: string): Promise<IpLookupResponse> {
    const accessKey = ConfigService.getIpLookupSecret();
    const url = ExternalEndpoints.IpStack(ip, accessKey);

    const response = await this.httpService.get(url).toPromise();

    return response.data;
  }
}
