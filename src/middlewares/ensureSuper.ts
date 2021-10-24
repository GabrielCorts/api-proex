import { Request, Response, NextFunction } from 'express';
import { EnumRoleUser } from '../entities/User';
import { UserService } from '../services/UserService';

export async function ensureSuper(request: Request, response: Response, next: NextFunction) {
  const { userId } = request;

  const userService = new UserService();

  const user = await userService.readById(userId);

  if (user.message === 'Usuário não existe!') {
    return response.status(404).json({ message: 'Usuário não existe!' });
  }

  if (user.obj.role === EnumRoleUser.SUPER) {
    return next();
  }

  return response.status(401).json({ error: 'Unauthorized' });
}
