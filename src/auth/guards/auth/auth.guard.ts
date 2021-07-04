import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { AuthErrorMessages } from 'src/auth/constants/auth-error-messages.constant';
import { AuthMetadata } from 'src/auth/constants/auth-metadata.constant';
import { User } from 'src/auth/entities/user.entity';
import { DecodedJwt } from 'src/auth/interfaces/decoded-jwt.interface';
import { AuthRepoService } from 'src/auth/services/auth-repo/auth-repo.service';
import { JwtService } from 'src/auth/services/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authRepo: AuthRepoService,
    private reflector: Reflector
  ) {}

  public async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const authRequiredOnClass = this.reflector.get<string[]>(AuthMetadata.AuthRequired, context.getClass());
    const authRequiredOnMethod = this.reflector.get<string[]>(AuthMetadata.AuthRequired, context.getHandler());

    if (!authRequiredOnClass && !authRequiredOnMethod) {
      return true;
    }

    const request: IncomingMessage = context.switchToHttp().getRequest();

    const authorizationHeaders = request.headers.authorization;

    if (!authorizationHeaders) {
      throw new UnauthorizedException(AuthErrorMessages.NoTokenProvided);
    }

    const decodedJwt = await this.getDecodedJwt(authorizationHeaders);

    const user = await this.authRepo.findUserForRequest(decodedJwt.id);

    (request as IncomingMessage & { user: Omit<User, 'password'> }).user = user;

    return true;
  }

  private async getDecodedJwt(authorization: string): Promise<DecodedJwt> {
    try {
      return await this.jwtService.decodeJwt(authorization);
    } catch (e) {
      throw new UnauthorizedException(AuthErrorMessages.SessionExpired);
    }
  }
}
