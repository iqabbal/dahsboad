import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Delete,
  Put,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/createUser.dto';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { UserService } from './user.service';
import { RoleGuard } from '../user/guards/role.guard';
import { Reflector } from '@nestjs/core';
import {Roles} from '../decorator/role.decorator'

@Controller('users')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create user
  @Roles(['admin'])
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    try {
      return await this.userService.createUser(body);
    } catch {
      throw new HttpException('username is taken', HttpStatus.CONFLICT);
    }
  }

  // delete user
  @Roles(['admin'])
  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    try {
      return await this.userService.deleteUser(username);
    } catch {
      throw new HttpException("can't delete this user", HttpStatus.CONFLICT);
    }
  }

  // update user   (*)
  @Roles(['user','admin'])
  @Put(':username')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('username') username: string,
  ) {
    try {
      return await this.userService.updateUser(body, username);
    } catch {
      throw new HttpException("can't update the user", HttpStatus.CONFLICT);
    }
  }

  // get one user
  @Roles(['user','admin'])
  @Get(':username')
  async getUniqueUser(@Param('username') username: string) {
    try {
      return await this.userService.getUniqueUser(username);
    } catch {
      throw new HttpException("can't get the user", HttpStatus.CONFLICT);
    }
  }

  // get all users
  @Roles(['admin'])
  @Get()
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch {
      throw new HttpException("can't get the user", HttpStatus.CONFLICT);
    }
  }
}
