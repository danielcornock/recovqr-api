import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'src/auth/entities/user.entity';
import { DecodedJwt } from 'src/auth/interfaces/decoded-jwt.interface';
import { ConfigService } from 'src/core/services/config/config.service';
import { promisify } from 'util';

@Injectable()
export class JwtService {
  public createJwt(user: Omit<User, 'password'>): string {
    const secret = ConfigService.getJwtSecret();
      
    return sign({
      id: user._id,
      email: user.email,
      name: user.name
    }, secret, {
      expiresIn: '90d'
    });
  }

  public decodeJwt(rawToken: string): Promise<DecodedJwt> {
    const token = this.extractTokenFromBearer(rawToken);
    const secret = ConfigService.getJwtSecret();

    return this.verify(token, secret);
  }

  private extractTokenFromBearer(token: string): string {
    if (!token?.startsWith('Bearer')) {
      throw new UnauthorizedException('Invalid authentication token');
    }

    return token.split(' ')[1];
  }

  private verify(token: string, secret: string): Promise<DecodedJwt> {
    const promisifiedVerify = promisify<string, string, DecodedJwt>(verify);

    return promisifiedVerify(token, secret);
  }
}
