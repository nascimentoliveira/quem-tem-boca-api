import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { UserResponseDTO } from '../users/dto/response-user.dto';
import { User } from '../users/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

/**
 * Authentication Guard
 *
 * This guard is responsible for protecting routes that require authentication.
 * It checks the validity of the provided authorization token and sets the authenticated user in the request object.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor for the AuthGuard.
   *
   * @param userService An instance of the UsersService for user-related operations.
   * @param authService An instance of the AuthService for authentication operations.
   */
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Determines if a route can be activated by checking the validity of the provided authorization token.
   *
   * @param context The execution context containing information about the current request.
   * @returns A boolean indicating whether the route can be activated.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data: Partial<User> = await this.authService.checkToken(
        authorization?.replace('Bearer ', ''),
      );
      const user: UserResponseDTO = await this.userService.findOne(data.id);
      request.user = user;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        const response = context.switchToHttp().getResponse();
        response.status(403).json({
          message:
            'Invalid or expired token. Please log into your account again!',
          error: 'Forbidden',
          statusCode: 403,
        });
      }
      return false;
    }
    return true;
  }
}
