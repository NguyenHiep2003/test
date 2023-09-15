import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY, Roles } from './decorator/role.decorator';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.userId = payload._id;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  extractToken(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const roles = this.reflector.getAllAndOverride(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.getUser({
      _id: request.userId,
    });
    if (!user) throw new UnauthorizedException();
    const { role: userRole } = user;
    return this.validateRoles(roles, userRole);
  }
  validateRoles(requiredRoles: string[], userRole: string): boolean {
    return requiredRoles.includes(userRole);
  }
}
