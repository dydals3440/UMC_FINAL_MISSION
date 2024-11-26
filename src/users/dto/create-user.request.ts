import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class CreateUserRequest {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ required: false, enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
