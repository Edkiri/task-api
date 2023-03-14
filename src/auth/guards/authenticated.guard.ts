import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    console.log(req.session);
    console.log('isAuthenticared', req.isAuthenticared());
    return req.isAuthenticated();
  }
}
