import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequest } from 'src/auth/dto/create-user-request.dto';
import { User, UserEntity } from 'src/auth/entities/user.entity';
import { ErrorMessages } from 'src/common/constants/error-messages.constant';

@Injectable()
export class AuthRepoService {
  constructor(
    @InjectModel(UserEntity.name) private userRepo: Model<UserEntity>
  ) {}

  public async findUserForLogin(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ email }).select('+password');

    if (!user) {
      throw new NotFoundException(ErrorMessages.InvalidAuthenticationDetails);
    }
  
    return user.toObject();
  }

  public async createUser(payload: CreateUserRequest): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userRepo.findOne({ email: payload.email });
    
    if (existingUser) {
      throw new BadRequestException(ErrorMessages.EmailAlreadyExists);
    }

    const user = await this.userRepo.create(payload);

    return user.toObject();
  }
}
