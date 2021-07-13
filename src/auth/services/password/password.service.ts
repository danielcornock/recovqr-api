import { Injectable, NotFoundException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AuthErrorMessages } from 'src/auth/constants/auth-error-messages.constant';

@Injectable()
export class PasswordService {
  public hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  public async checkPasswordsMatch(testPassword: string, controlPassword: string): Promise<void> {
    const isMatch = await compare(testPassword, controlPassword);

    if (!isMatch) {
      throw new NotFoundException(AuthErrorMessages.InvalidAuthenticationDetails);
    }
  }
}
