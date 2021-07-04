import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { AuthMetadata } from '../constants/auth-metadata.constant';

export const AuthRequired = (): CustomDecorator<string> => SetMetadata(AuthMetadata.AuthRequired, true);