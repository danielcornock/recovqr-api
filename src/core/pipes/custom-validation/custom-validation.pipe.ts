import { BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: (errors: ValidationError[]): BadRequestException => {
        /* Converts array of errors in to dictionary, keyed by the field name */
        const transformedErrors = errors.reduce((obj, error) => {
          const message = Object.values(error.constraints)[0];
    
          const capitalisedMessage = message?.[0].toUpperCase() + message?.substring(1);
    
          obj[error.property] = capitalisedMessage;
    
          return obj;
        }, {} as Record<string, string>);
    
        return new BadRequestException(transformedErrors);
      }
    });
  }
}
