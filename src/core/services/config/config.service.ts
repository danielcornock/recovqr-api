import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '../../../../config.env') });

export class ConfigService {
  public static getDatabaseUri(): string {
    console.log(process.env.DATABASE_URI);
    return process.env.DATABASE_URI || '';
  }

  public static getPort(): string {
    return process.env.PORT || '3000';
  }

  public static getEnvironment(): string {
    return process.env.NODE_ENV;
  }

  public static getJwtSecret(): string {
    return process.env.JWT_SECRET;
  }

  public static getIpLookupSecret(): string {
    return process.env.IP_LOOKUP_SECRET;
  }

  public static getGeolocationLookupSecret(): string {
    return process.env.MAPQUEST_SECRET;
  }
}
