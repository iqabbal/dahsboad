import {ArrayMinSize, IsString, IsNotEmpty, IsIn ,IsArray} from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @IsIn([
    'import_file',
    'edit_ship_details',
    'display_ship_details',
    'download_ship_list',
    'manage_waiting_causes',
    'display_ship_list',
    'display_dashboard',
    'authenticate',
    'manage_users',
    'manage_role_permission',
  ], {
    each: true,
    message: "permission is not valid",
  })
  permissions: string[];
}
