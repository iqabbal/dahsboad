import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Roles} from '../../decorator/role.decorator'
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') {
   constructor(private reflector: Reflector) {
      super();
   }
   async canActivate(context: ExecutionContext) {
      // check if jwt is valid
      const isAuthenticated = await super.canActivate(context);
      if (!isAuthenticated) {
         return false;
      }

      // get required roles to access this controller
      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles)
         return false;



      // get roles stored in jwt
      const request = context.switchToHttp().getRequest();
      const data = request.user;


      // check if there's a role that is identical
      return roles.some(requiredRole =>
            data.Roles?.some(userRole => userRole.RoleName === requiredRole)
      );
   }
}
