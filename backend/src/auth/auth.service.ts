import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginUserDto } from './DTO/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly database: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async findUser(body: LoginUserDto) {
    try {
      const userWithRoles = await this.database.tB_USER.findUnique({
        where: { username: body.username },
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
      if (!userWithRoles) throw 'error';

      if (
        !(await bcrypt.compare(body.password, userWithRoles.hashed_password))
      ) {
        throw 'incorrect password';
      }

      const responseData = userWithRoles.TB_USER_ROLES.map((role) => {
        return { RoleName: role.TB_ROLES.libelle };
      });

      return this.jwt.sign({ username: userWithRoles.username,Roles :responseData });
    } catch (error) {
      throw error;
    }
  }
}
