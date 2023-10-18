import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateUserReq {
  @IsMongoId()
  _id: ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;
}
