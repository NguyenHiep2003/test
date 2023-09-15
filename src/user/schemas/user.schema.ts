import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ListRole } from 'src/utils/ListRole';

@Schema()
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  username: string;
  @Prop()
  hashedPassword: string;
  @Prop({ default: ListRole.USER })
  role: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
