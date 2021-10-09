import { Controller, Get } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';

@Controller()
export class ApiAuthController {
  constructor(private readonly apiAuthService: ApiAuthService) {}

  @Get()
  getHello(): string {
    return this.apiAuthService.getHello();
  }
}
