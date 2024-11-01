import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request as RequestType } from 'express';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JWTStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'test',
    });
  }

  private static extractJwtFromCookie(req: RequestType) {
    if (!req.cookies.jwt)
      return false;
    return req.cookies.jwt;
  }

  async validate(payload: any) {
    return payload;
  }
}
