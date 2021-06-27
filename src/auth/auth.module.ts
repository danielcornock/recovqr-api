import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { AuthRepoService } from './services/auth-repo/auth-repo.service';
import { JwtService } from './services/jwt/jwt.service';
import { PasswordService } from './services/password/password.service';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])
  ],
  providers: [AuthRepoService, JwtService, PasswordService],
  controllers: [AuthController]
})
export class AuthModule {}
