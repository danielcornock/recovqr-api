import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthErrorMessages } from 'src/auth/constants/auth-error-messages.constant';
import { CreateUserPayload } from 'src/auth/dto/create-user-request.dto';
import { User, UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class AuthRepoService {
  constructor(
    @InjectModel(UserEntity.name) private userRepo: Model<UserEntity>
  ) {}

  public async findUserForLogin(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ email }).select('+password');

    if (!user) {
      throw new NotFoundException(AuthErrorMessages.InvalidAuthenticationDetails);
    }
  
    return user.toObject();
  }

  public async createUser(payload: CreateUserPayload): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userRepo.findOne({ email: payload.email });
    
    if (existingUser) {
      throw new BadRequestException(AuthErrorMessages.EmailAlreadyExists);
    }

    const user = await this.userRepo.create(payload);

    return user.toObject();
  }

  public async findUserForRequest(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepo.findById(id);

    return user.toObject();
  }
}
