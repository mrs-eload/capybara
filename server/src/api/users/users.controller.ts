import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { GetUserDTO, InsertUserDTO } from './user.dto';
import { UserService } from './users.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from '../../infrastructure/database/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Post()
  insert(@Body() user: InsertUserDTO) {
    return this.userService.insert(user);
  }

  @Post('find')
  @ApiOperation({
    summary: 'Find user by id',
    description: 'Find user by id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
    isArray: true,
  })
  async getByEmail(@Body() user_dto: GetUserDTO) {
    const user = await this.userService.getByEmail(user_dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }
}
