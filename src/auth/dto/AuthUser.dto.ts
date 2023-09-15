import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, NotContains } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({
    type: String,
    description: 'Must required',
    example: 'mancity3011@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Must required',
    example: 'hahahaha',
  })
  @Length(6)
  @NotContains(' ', {
    message: 'Password should not contains space',
  })
  password: string;
  age: number;
}
