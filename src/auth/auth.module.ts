import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/core/services/config/config.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserEntity, UserSchema } from './entities/user.entity';
import { AuthGuardProvider } from './providers/auth-guard.provider';
import { AuthRepoService } from './services/auth-repo/auth-repo.service';
import { PasswordService } from './services/password/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    JwtModule.register({
      secret: ConfigService.getJwtSecret(),
      signOptions: {
        expiresIn: '90d'
      }
    })
  ],
  providers: [
    AuthRepoService,
    PasswordService,
    AuthGuardProvider
  ],
  controllers: [AuthController],
  exports: [AuthRepoService]
})
export class AuthModule {}
