import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ type: String, description: 'Must required' })
  @IsNotEmpty()
  currentPassword: string;
  @ApiProperty({
    type: String,
    description: 'Must required, at least 6 characters',
  })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
