import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, LocalLoginGuard } from '../guards';
import { LoginDto } from '../dto';
import { LocalAuthService } from './local.auth.service';

@ApiTags('Authentication Local')
@ApiBearerAuth('access-token')
@Controller('auth/local')
export class LocalAuthController {
  constructor(private readonly authService: LocalAuthService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('/authenticated')
  async getAuthenticatedHello(@Request() req?) {
    return { user: req.user, message: `Hello authenticated mine turtle` };
  }

  @UseGuards(LocalLoginGuard)
  @ApiHeader({
    name: 'Dng-Internal-Api-Key',
    required: true,
    example: 'be96e62d-389a-496b-91ed-9be886831158',
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/logout')
  async logout(@Request() req) {
    req.logout();
  }
}
