import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
