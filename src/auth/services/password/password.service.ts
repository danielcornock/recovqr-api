import { Injectable, NotFoundException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { ErrorMessages } from 'src/common/constants/error-messages.constant';

@Injectable()
export class PasswordService {
  public hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  public async checkPasswordsMatch(testPassword: string, controlPassword: string): Promise<void> {
    const isMatch = await compare(testPassword, controlPassword);

    if (!isMatch) {
      throw new NotFoundException(ErrorMessages.InvalidAuthenticationDetails);
    }
  }
}
