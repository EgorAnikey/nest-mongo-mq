import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserReq {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
