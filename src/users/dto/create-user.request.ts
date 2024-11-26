import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class CreateUserRequest {
  @ApiProperty({ required: true, example: 'dydals3440@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Smu123!!' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    required: false,
    example: 'user',
    description: 'user 또는 admin만 가능합니다.',
  })
  @IsString()
  @IsOptional()
  role?: string | null;
}
