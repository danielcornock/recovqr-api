import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, LeanDocument, SchemaTypes } from 'mongoose';
import { Coordinates } from 'src/core/interfaces/coordinates.interface';
import { Util } from 'src/core/services/util/util.service';

@Schema({
  timestamps: true
})
export class TagEntity extends Document {
  @Prop({ type: SchemaTypes.ObjectId, required: true, index: true })
  public userId: string;

  @Prop({ type: Object, required: true })
  public coordinates: Coordinates;

  @Prop({ type: [String], required: true })
  public address: Array<string>;

  @Prop({ type: String, required: true })
  public shortAddress: string;

  @Prop({ type: String, required: true })
  public ipAddress: string;

  @Prop({ type: Boolean, required: true })
  public locationIsAccurate: boolean;
}

export const TagSchema = SchemaFactory.createForClass(TagEntity);

Util.normaliseResponse(TagSchema);

export type Tag = Omit<LeanDocument<TagEntity>, '__v'>;