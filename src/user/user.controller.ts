import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ListMessage } from 'src/utils/ListMessage';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UpdatePasswordDto } from './dtos/UpdatePass.dto';
import { Public, Roles } from 'src/auth/decorator/role.decorator';
import { ListRole } from 'src/utils/ListRole';
import { User } from './decorator/user.decorator';
import { AuthGuard, RoleGuard } from 'src/auth/auth.guard';
@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  ////////////////////////////////////////////////////////////////////////////////////
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ description: 'Created account successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Public()
  async signUp(@Body() body: RegisterUserDto) {
    try {
      const checkExistEmail = await this.userService.getUser({
        email: body.email,
      });
      if (checkExistEmail)
        throw new BadRequestException(ListMessage.ALREADY_EXIST_EMAIL);
      const hashedPassword = await this.userService.hashPassword(body.password);
      const dataForCreateUser = {
        ...body,
        hashedPassword,
      };
      await this.userService.createUser(dataForCreateUser);
      return { message: ListMessage.CREATED };
    } catch (error) {
      if (error.status == 500) console.log(error);
      throw error;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  @Roles([ListRole.ADMIN])
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @Get()
  async fetchAllUser() {
    try {
      return this.userService.getAllUser();
    } catch (error) {
      if (error.status == 500) console.log(error);
      throw error;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  @Patch('password')
  @ApiOperation({ summary: 'Change password' })
  @ApiBearerAuth()
  async updatePassword(
    @User('userId') _id: string,
    @Body() { currentPassword, newPassword }: UpdatePasswordDto,
  ) {
    try {
      const user = await this.userService.getUser({ _id });
      const checkPassword = await this.userService.checkPassword(
        currentPassword,
        user.hashedPassword,
      );
      if (!checkPassword)
        throw new BadRequestException(ListMessage.WRONG_PASSWORD);
      user.hashedPassword = await this.userService.hashPassword(newPassword);
      user.save();
      return { message: ListMessage.UPDATED };
    } catch (error) {
      if (error.status == 500) console.log(error);
      throw error;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  @Roles([ListRole.ADMIN])
  @ApiOperation({ summary: 'Change user information' })
  @ApiBearerAuth()
  @Patch(':id')
  @ApiPropertyOptional()
  async updateInfoUser(@Param('id') _id: string, @Body() body: UpdateUserDto) {
    try {
      const user = await this.userService.updateInfoUser(_id, body);
      if (!user) throw new NotFoundException(ListMessage.USER_NOT_FOUND);
      return { message: ListMessage.UPDATED };
    } catch (error) {
      if (error.status == 500) console.log(error);
      throw error;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // @Get('test')
  // @HttpCode(400)
  // @Header('haha', 'hehe')
  // //@Redirect('https://www.google.com/')
  // async test() {
  //   const obs = of(1, 2, 3);
  //   return obs.pipe(
  //     map((data) => {
  //       data;
  //     }),
  //   );
  // }
}
