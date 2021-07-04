import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth/auth.controller';
import { UserEntity, UserSchema } from './entities/user.entity';
import { AuthGuardProvider } from './providers/auth-guard.provider';
import { AuthRepoService } from './services/auth-repo/auth-repo.service';
import { JwtService } from './services/jwt/jwt.service';
import { PasswordService } from './services/password/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])
  ],
  providers: [
    AuthRepoService,
    JwtService,
    PasswordService,
    AuthGuardProvider
  ],
  controllers: [AuthController],
  exports: [JwtService, AuthRepoService]
})
export class AuthModule {}
