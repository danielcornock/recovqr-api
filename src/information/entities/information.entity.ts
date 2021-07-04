import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, SchemaTypes, Types } from 'mongoose';
import { Util } from 'src/common/services/util.service';

@Schema()
export class InformationEntity extends Document {
  @Prop({ type: String })
  public name: string;

  @Prop({ type: String })
  public email: string;

  @Prop({ type: String })
  public telephone: string;

  @Prop({ type: String })
  public country: string;

  @Prop({ type: String })
  public message: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, index: true })
  public userId: Types.ObjectId;
}

export const InformationSchema = SchemaFactory.createForClass(InformationEntity);

Util.normaliseResponse(InformationSchema);

export type Information = Omit<LeanDocument<InformationEntity>, '__v'>;