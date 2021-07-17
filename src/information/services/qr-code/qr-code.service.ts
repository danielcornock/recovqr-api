import { Injectable } from '@nestjs/common';
import { Canvas, Image } from 'canvas';
import * as mergeImages from 'merge-images';
import * as QrCode from 'qrcode';

@Injectable()
export class QrCodeService {
  public async generateUserQrCodes({ userId, origin }: { userId: string, origin: string }): Promise<string[]> {
    const rawQrCode = await this.generateRawQr(userId, origin);
    const mergedImage = await mergeImages([
      'assets/qr-frame-sm.png',
      { src: rawQrCode, x: 41, y: 41 }
    ], {
      Canvas,
      Image,
      quality: 1
    });

    return [rawQrCode, mergedImage];
  }

  private async generateRawQr(userId: string, origin: string): Promise<string> {
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
