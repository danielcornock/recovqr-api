import { Document, Schema } from 'mongoose';

export class Util {
  public static normaliseResponse<T extends Document>(
    schema: Schema<T>
  ): void {
    schema.set('toObject', {
      virtuals: true,
      versionKey: false
    });
    schema.set('toJSON', {
      virtuals: true,
      versionKey: false
    });
  }
}