import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './DTO/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly database: PrismaService) {}
  async createUser(body: CreateUserDto) {
    try {
      // create the role
      const role = await this.database.tB_ROLES.findUnique({
        where: {
          libelle: body.roleName,
        },
      });

      if (!role) throw 'error';

      const newUser = await this.database.tB_USER.create({
        data: {
          nom: body.lastName,
          prenom: body.firstName,
          username: body.username,
          email: body.lastName + '.' + body.firstName + '@gmail.com',
          hashed_password: await bcrypt.hash(body.password, 10),
          TB_USER_ROLES: {
            create: [
              {
                TB_ROLES: { connect: { id: role.id } },
              },
            ],
          },
        },
        include: {
          TB_USER_ROLES: {
            include: {
              TB_ROLES: {
                select: {
                  libelle: true,
                },
              },
            },
          },
        },
      });
      const responseData = newUser.TB_USER_ROLES.map((role) => {
        return { RoleName: role.TB_ROLES.libelle };
      });
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(username: string) {
    try {
      // find the user
      const user = await this.database.tB_USER.findUnique({
        where: {
          username: username,
        },
        select: {
          id: true,
        },
      });
      if (!user) throw 'not found';

      // delete all user roles
      await this.database.tB_USER_ROLES.deleteMany({
        where: {
          user_id: user.id,
        },
      });

      // delete if found
      await this.database.tB_USER.delete({
        where: {
          username: username,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(body: any, username: string) {
    try {
      const user = await this.database.tB_USER.update({
        where: {
          username: username,
        },
        data: {},
      });
      // find the user
      // update if found
    } catch (error) {
      throw error;
    }
  }

  async getUniqueUser(username: string) {
    try {
      const userWithRoles = await this.database.tB_USER.findUnique({
        where: { username: username },
        select: {
          username: true,
          nom: true,
          prenom: true,
          TB_USER_ROLES: {
            select: {
              TB_ROLES: {
                select: {
                  libelle: true,
                },
              },
            },
          },
        },
      });
      if (!userWithRoles) throw 'error';

      // flatten the data
      const userRoles = userWithRoles.TB_USER_ROLES.map((role) => {
        return { RoleName: role.TB_ROLES.libelle };
      });

      // finale response
      const userData = {
        username: userWithRoles.username,
        nom: userWithRoles.nom,
        prenom: userWithRoles.prenom,
        Roles: userRoles,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const allUsers = await this.database.tB_USER.findMany({
        select: {
          username: true,
          nom: true,
          prenom: true,
          TB_USER_ROLES: {
            select: {
              TB_ROLES: {
                select: {
                  libelle: true,
                },
              },
            },
          },
        },
      });
      // finale response
      const ResponseData: object[] = [];

      for (const user of allUsers) {
        const userRoles = user.TB_USER_ROLES.map((role) => {
          return { RoleName: role.TB_ROLES.libelle };
        });

        ResponseData.push({
          username: user.username,
          nom: user.nom,
          prenom: user.prenom,
          Roles: userRoles,
        });
      }

      return ResponseData;
    } catch (error) {
      throw error;
    }
  }
}
