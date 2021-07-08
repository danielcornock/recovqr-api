export interface ExternalInaccurateGeoData {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: string;
  longitude: string;
  location: IpLookupLocation;
}

interface IpLookupLocation {
  geoname_id: number;
  capital: string;
  languages: Array<IpLookupLanguage>
  country_flag: string;
  country_flag_emoji: string;
  country_flag_emoji_unicode: string;
  calling_code: number;
  is_eu: boolean;
}

interface IpLookupLanguage {
  code: string;
  name: string;
  native: string;
}