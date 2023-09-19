import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { AuthResponseDTO } from './dto/response-auth.dto';
import { RequestRecoveryDTO } from './dto/request-recovery.dto';
import { ResponseRecoveryDTO } from './dto/reponse-recovery.dto';
import { RecoveryUnprocessableEntityResponseDTO } from './dto/unprossessable-recovery.dto';
import { AuthUnprocessableEntityResponseDTO } from './dto/unprossessable-auth.dto';
import { AuthUnauthorizedResponseDTO } from './dto/unauthorized-auth.dto';
import { InternalServerErrorDTO } from '../dto/responses/internal-server-error.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login.' })
  @ApiBody({
    type: CreateAuthDTO,
    description: 'User credentials for logging in.',
  })
  @ApiCreatedResponse({
    description: 'User logged in successfully.',
    type: AuthResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'User not registered or invalid password.',
    type: AuthUnauthorizedResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: AuthUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  async create(@Body() body: CreateAuthDTO) {
    return this.authService.create(body);
  }

  @ApiOperation({ summary: 'Request password recovery' })
  @ApiBody({
    type: RequestRecoveryDTO,
    description: 'The data required to initiate a password recovery request.',
  })
  @ApiCreatedResponse({
    description: 'Password recovery request initiated successfully.',
    type: ResponseRecoveryDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: RecoveryUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post('recovery')
  async requestRecovery(@Body() body: RequestRecoveryDTO) {
    return this.authService.requestRecovery(body);
  }
}
