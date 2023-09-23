import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

/**
 * Exception Interceptor
 *
 * This interceptor handles exceptions thrown during the execution of a request.
 * It intercepts exceptions and categorizes them as known exceptions (e.g., NotFound,
 * Unauthorized) or internal server errors. In case of a known exception, it rethrows
 * the exception for further handling by the application. In case of an unknown or
 * unexpected exception, it throws an InternalServerErrorException.
 */
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  /**
   * Intercept the request and handle exceptions.
   * @param context The current execution context.
   * @param next The next call handler.
   * @returns An observable that handles exceptions.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const knownExceptions = [
          ConflictException,
          UnauthorizedException,
          ForbiddenException,
          NotFoundException,
          ConflictException,
          UnprocessableEntityException,
        ] as const;

        if (knownExceptions.some((exception) => error instanceof exception)) {
          throw error;
        } else {
          throw new InternalServerErrorException(
            'Ocorreu um erro interno do servidor. ' +
              'Por favor, verifique os parâmetros ou tente novamente mais tarde.',
          );
        }
      }),
    );
  }
}
