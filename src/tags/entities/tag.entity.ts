import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, SchemaTypes, Types } from 'mongoose';
import { Util } from 'src/core/services/util/util.service';

@Schema({
  timestamps: true
})
export class TagEntity extends Document {
  @Prop({ type: SchemaTypes.ObjectId, required: true, index: true })
  public userId: Types.ObjectId;
}

export const TagSchema = SchemaFactory.createForClass(TagEntity);

Util.normaliseResponse(TagSchema);

export type Tag = Omit<LeanDocument<TagEntity>, '__v'>;