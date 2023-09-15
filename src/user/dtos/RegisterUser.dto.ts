import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, NotContains } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    type: String,
    description: 'Must required',
    example: 'Hiep',
  })
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
    example: 'Nguyen',
  })
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
    example: 'mancity3011@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
    example: 'Mcvodich',
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    type: String,
    description: 'Must required, at least 6 characters, contains no space',
    example: 'hahahaha',
  })
  @NotContains(' ', {
    message: 'Password should not contains space',
  })
  @MinLength(6)
  password: string;
}
