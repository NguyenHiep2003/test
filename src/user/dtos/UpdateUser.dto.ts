import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ListRole } from 'src/utils/ListRole';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'Is optional',
    example: 'Hao',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty({
    type: String,
    description: 'Is optional',
    example: 'Nguyen',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty({
    type: String,
    description: 'Is optional',
    example: 'citizens',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;
  @ApiProperty({
    type: String,
    description: 'Is optional',
    example: 'Admin',
    enum: ListRole,
  })
  @IsEnum(ListRole)
  @IsOptional()
  role: string;
}
