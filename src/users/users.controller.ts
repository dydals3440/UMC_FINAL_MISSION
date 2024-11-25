import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Prisma, User } from '@prisma/client'; // Prisma 타입 가져오기
import { RBAC, Role } from 'src/auth/decorators/rbac.decorator';
import { RBACGuard } from 'src/auth/guards/rbac.guard';
import {} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body()
    request: Pick<Prisma.UserCreateInput, 'email' | 'password' | 'role'>,
  ) {
    await this.userService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RBACGuard)
  @RBAC(Role.admin)
  async getUsers(@CurrentUser() user: User) {
    console.log(user);
    return await this.userService.getUsers();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getMe({ id: user?.id });
  }
}
