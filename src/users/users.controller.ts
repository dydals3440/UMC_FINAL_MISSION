import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client'; // Prisma 타입 가져오기
import { RBAC, Role } from 'src/auth/decorators/rbac.decorator';
import { RBACGuard } from 'src/auth/guards/rbac.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { User as UserEntity } from './entity/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(
    @Body()
    request: CreateUserRequest,
  ) {
    await this.userService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RBACGuard)
  @RBAC(Role.admin)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers(@CurrentUser() user: User) {
    console.log(user);
    return await this.userService.getUsers();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getMe({ id: user?.id });
  }
}
