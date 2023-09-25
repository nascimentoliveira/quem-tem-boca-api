import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
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
   * A custom authentication guard to protect routes requiring JWT authentication.
   *
   * This guard checks the presence and validity of a JWT token in the request header's "Authorization" field.
   * If the token is missing or invalid, it returns an appropriate error response.
   *
   * @param {ExecutionContext} context - The execution context for the route handler.
   * @returns {Promise<boolean>} A boolean indicating whether the user is authorized to access the route.
   * @throws {UnauthorizedException} Thrown when the JWT token is invalid or expired.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    try {
      const { authorization } = request.headers;
      if (!authorization) {
        response.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Campo "Authorization" não encontrado no cabeçalho.',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
        return false;
      }
      const data: Partial<User> = await this.authService.checkToken(
        authorization?.replace('Bearer ', ''),
      );
      const user: Partial<User> = await this.userService.getLoggedInUser(
        data.id,
      );
      request.user = user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        response.status(HttpStatus.UNAUTHORIZED).json({
          message:
            'Token inválido ou expirado. Por favor, faça login em sua conta novamente!',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }
      return false;
    }
    return true;
  }
}
