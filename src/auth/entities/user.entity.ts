import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument } from 'mongoose';
import { Util } from 'src/core/services/util/util.service';

@Schema({
  timestamps: true
})
export class UserEntity extends Document {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  public email: string;

  @Prop({ type: String, required: true, select: false })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

Util.normaliseResponse(UserSchema);

export type User = Omit<LeanDocument<UserEntity>, '__v'>;