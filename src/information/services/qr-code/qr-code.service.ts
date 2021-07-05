import { Injectable } from '@nestjs/common';
import * as QrCode from 'qrcode';

@Injectable()
export class QrCodeService {
  public generateUserQrCode({ userId, origin }: { userId: string, origin: string }): Promise<string> {
    const qrCodeUrl = `${origin}/information/${userId}`;

    return new Promise((resolve, reject) => {
      QrCode.toDataURL(qrCodeUrl, (err, url) => {
        if (err) {
          reject(err);
        }

        resolve(url);
      });
    });
  }
}
