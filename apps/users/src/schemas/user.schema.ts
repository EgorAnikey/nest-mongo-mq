import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: { updatedAt: false } })
export class User {
  @Prop()
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
