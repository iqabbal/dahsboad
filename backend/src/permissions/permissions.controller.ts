import {Controller,Get,HttpException,HttpStatus} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import {Roles} from '../decorator/role.decorator'

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Roles(['admin'])
  @Get()
  async getAllPermissions() {
    try {
      return await this.permissionsService.getAllPermissionNames();
    } catch  {
      throw new HttpException('cant\'t get the permissions', HttpStatus.CONFLICT);
    }

  }
}
