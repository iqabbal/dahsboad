import {Controller,Post, Put, Get,UseGuards,Param,Body,HttpException,HttpStatus} from '@nestjs/common';
import { RoleGuard } from '../user/guards/role.guard';
import {Roles} from '../decorator/role.decorator'
import {RolesService} from './roles.service'
import {CreateRoleDto} from './DTO/createRole.dto'

@Controller('roles')
@UseGuards(RoleGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  // create one role
  @Roles(['admin'])
  @Post()
  async createRole(@Body() body: CreateRoleDto) {
    try {
      return await this.roleService.createRole(body);
    } catch (error ){
      throw new HttpException('can\'t create the role', HttpStatus.CONFLICT);
    }
  }

  // update role
  @Roles(['admin'])
  @Put(':roleName')
  updateRole(@Param('roleName') roleName: string) {
    try {
      return this.roleService.updateRole(roleName);
    } catch{
      throw new HttpException('can\'t update the role', HttpStatus.CONFLICT);
    }
  }

  // get info about one role
  @Roles(['admin'])
  @Get(':roleName')
  async getRole(@Param('roleName') roleName: string) {
    try {
      return await this.roleService.getRole(roleName);
    } catch{
      throw new HttpException('can\'t find the role', HttpStatus.CONFLICT);
    }
  }

  // get all roles
  @Roles(['admin'])
  @Get()
  getAllRoles() {
    try {
      return this.roleService.getAllRoles();
    } catch{
      throw new HttpException('can\'t get the roles', HttpStatus.CONFLICT);
    }
  }
}
