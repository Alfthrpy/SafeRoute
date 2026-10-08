import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example:
      '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  })
  @IsString()
  @IsNotEmpty({ message: 'Reset token is required' })
  @Matches(/^[a-f0-9]{64}$/i, {
    message: 'Reset token must be a valid token',
  })
  token: string;

  @ApiProperty({ example: 'aNewPassword123' })
  @IsString()
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  newPassword: string;
}
