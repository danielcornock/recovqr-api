import { config } from 'dotenv';

config({ path: 'config.env' });

export class ConfigService {
  public static getDatabaseUri(): string {
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
}
