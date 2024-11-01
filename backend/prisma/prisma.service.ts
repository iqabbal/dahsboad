import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    // create user role
    const userRole = await this.tB_ROLES.create({
      data: {
        libelle: 'user',
      },
    });

    // create admin role
    const adminRole = await this.tB_ROLES.create({
      data: {
        libelle: 'admin',
      },
    });
    this.getPermissions(userRole.id);
    this.getPermissions(adminRole.id);
  }

  async getPermissions(id: number) {
    const Permissions = await this.tB_PERMISSION.findMany({
      select: {
        id: true,
      },
    });
    await Promise.all(
      Permissions.map(async (permission) => {
        await this.tB_ROLE_PERMISSION.create({
          data: {
            role_id: id,
            permission_id: permission.id,
          },
        });
      }),
    );
  }
}
