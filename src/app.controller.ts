import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthOkResponseDTO } from './dto/app/responseOk-health.dto';
import { HealthErrorResponseDTO } from './dto/app/responseError-health.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * App Controller
 *
 * The App Controller handles API status checks. It provides an endpoint to check
 * the health and status of the API.
 */
@ApiTags('Health')
@Controller('api')
export class AppController {
  /**
   * Constructor for the AppController.
   *
   * @param appService An instance of the AppService for handling API health checks.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Check API status.
   *
   * @returns A response indicating the status of the API.
   */
  @ApiOperation({ summary: 'Check API status' })
  @ApiResponse({
    status: 200,
    description: 'Status checked successfully.',
    type: HealthOkResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HealthErrorResponseDTO,
  })
  @Get('health')
  checkHealth() {
    return this.appService.checkHealth();
  }
}
