import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ListService } from '../services/list.service';

@Injectable()
export class IsListOwner implements CanActivate {
  constructor(private readonly listService: ListService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const todo = await this.listService.findOne(request.params.listId);
    if (todo.user.id !== user.id) {
      throw new UnauthorizedException(
        'You do not have permissions to perform this action',
      );
    }
    return true;
  }
}
