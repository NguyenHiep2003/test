import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Must required',
  })
  firstName: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
  })
  lastName: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
  })
  email: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
  })
  username: string;
  @ApiProperty({
    type: String,
    description: 'Must required',
  })
  hashedPassword: string;
}
