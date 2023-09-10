import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Redirect Middleware
 *
 * This middleware is responsible for handling redirects based on incoming requests.
 * It redirects commonly accessed routes ('/', '/api', etc) to the '/api/health' endpoint.
 */
@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  /**
   * Middleware execution function.
   *
   * @param req - The incoming request object.
   * @param res - The response object.
   * @param next - The callback function to pass control to the next middleware.
   */
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method } = req;
    if (
      (originalUrl === '/' ||
        originalUrl === '/api' ||
        originalUrl === '/api/') &&
      method === 'GET'
    ) {
      return res.redirect(HttpStatus.SEE_OTHER, '/api/health');
    }
    next();
  }
}
