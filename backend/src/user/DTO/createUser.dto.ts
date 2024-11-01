import { IsString, IsNotEmpty, IsIn } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  Email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsIn(['admin', 'user'], {
    message: "roleName must be either 'admin', 'user'",
  })
  @IsNotEmpty()
  roleName: string;
}
