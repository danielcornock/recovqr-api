export const ExternalEndpoints = {
  IpStack: (ipAddress: string, secret: string): string => `http://api.ipstack.com/${ipAddress}?access_key=${secret}`
};