import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserPayload } from 'src/auth/dto/create-user-request.dto';
import { LoginPayload } from 'src/auth/dto/login-request.dto';
import { UserCreatedEvent } from 'src/auth/events/user-created.event';
import { AuthResponse } from 'src/auth/interfaces/auth-response.interface';
import { AuthRepoService } from 'src/auth/services/auth-repo/auth-repo.service';
import { PasswordService } from 'src/auth/services/password/password.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authRepoService: AuthRepoService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2
  ) {}

  @Post('register')
  public async register(@Body() payload: CreateUserPayload): Promise<AuthResponse> {
    const email = payload.email.toLowerCase();
    const password = await this.passwordService.hashPassword(payload.password);

    const user = await this.authRepoService.createUser({
      email,
      password,
      name: payload.name
    });

    this.eventEmitter.emit(
      UserCreatedEvent.name,
      new UserCreatedEvent(user)
    );

    const jwt = await this.jwtService.signAsync({
      id: user._id,
      email: user.email,
      name: user.name
    });

    return { jwt, name: user.name, email: user.email };
  }

  @Post('login')
  public async login(@Body() payload: LoginPayload): Promise<AuthResponse> {
    const email = payload.email.toLowerCase();
    const user = await this.authRepoService.findUserForLogin(email);

    await this.passwordService.checkPasswordsMatch(payload.password, user.password);
  
    const jwt = await this.jwtService.signAsync({
      id: user._id,
      email: user.email,
      name: user.name
    });
  
    return { jwt, name: user.name, email: user.email };
  }
}
