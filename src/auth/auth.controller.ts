import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserDto } from 'src/auth/dto/AuthUser.dto';
import { AuthService } from './auth.service';
import { ListMessage } from 'src/utils/ListMessage';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Api for login' })
  @ApiCreatedResponse({ description: 'Login successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async logIn(@Body() { email, password }: AuthUserDto) {
    try {
      const user = await this.authService.validateUser({ email, password });
      if (!user) throw new BadRequestException(ListMessage.WRONG_CREDENTIALS);
      const access_token = await this.authService.generateToken(
        user._id.toString(),
      );
      return { message: ListMessage.LOGIN, access_token };
    } catch (error) {
      if (error.status == 500) console.log(error);
      throw error;
    }
  }
}
