import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './DTO/loginUser.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    try {
      const data = await this.authService.findUser(body);
      res.cookie('jwt', data, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.send();
    } catch {
      throw new HttpException(
        'username or password is wrong',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('logout')
  logout(@Res() res: Response) {
    /* blacklist token solution */
    // we need to create a table for all invalid tokens and then and delete them after the expiry date
    // and we need to run a crontab  of the expriry date after creating the token
    // the crontab will check if the token is in the invalid tokens table and delete it
    // so the solution would be to create a table in the database with the invalid token and the id of user
    //
    res.clearCookie('jwt');
    return res.send();
  }
}
