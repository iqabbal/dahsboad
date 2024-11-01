import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private readonly database: PrismaService) {}
  async getAllPermissionNames() {
    try {
      const permissions = await this.database.tB_PERMISSION.findMany({
        select: {
          libelle: true,
        },
      });
      return permissions.map(permission => permission.libelle);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      throw new Error("Error fetching permissions");
    }
  }
}
