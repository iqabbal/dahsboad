import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {CreateRoleDto} from './DTO/createRole.dto'

@Injectable()
export class RolesService {
  constructor(private readonly database: PrismaService) {}

  async createRole(body: CreateRoleDto) {
    try {
      const permissions = await this.database.tB_PERMISSION.findMany({
         where: { libelle: { in: body.permissions } }
      });
      if (permissions.length !== body.permissions.length) {
         throw new Error("One or more permissions do not exist.");
      }
      return await this.database.tB_ROLES.create({
         data: {
            libelle: body.roleName,
            TB_ROLE_PERMISSION: {
               create: permissions.map(permission => ({
                  TB_PERMISSION: {
                     connect: { id: permission.id }
                  }
               }))
            }
         }
      });
    } catch (error){
         throw new Error("One or more permissions do not exist.");
    }
  }


  updateRole(roleName: string) {
  }

  async getRole(roleName: string) {
   try {
      const role = await this.database.tB_ROLES.findUnique({
         where: {
            libelle: roleName,
         },
         select: {
            libelle: true,
            TB_ROLE_PERMISSION: {
               select: {
                  TB_PERMISSION: {
                     select: {
                        libelle: true,
                     },
                  },
               },
            },
         },
      });
      if (!role) 
        throw ""
      return role;
   } catch (error) {
      throw new Error("Error fetching role");
   }
}


  async getAllRoles() {
   try {
      const roles = await this.database.tB_ROLES.findMany({
         select: {
            libelle: true,
            TB_ROLE_PERMISSION: {
               select: {
                  TB_PERMISSION: {
                     select: {
                        libelle: true,
                     },
                  },
               },
            },
         },
      });
      return roles;
   } catch (error) {
      throw new Error("Error fetching role");
   }
  }
}
