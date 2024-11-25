import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Prisma, User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GetPostsDto } from './dto/get-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body()
    request: Pick<
      Prisma.PostCreateInput,
      'title' | 'content' | 'author' | 'imageUrl'
    >,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(request, user?.id);
  }

  @Get()
  getPosts(@Query() dto: GetPostsDto, @CurrentUser() user: User) {
    return this.postService.findAll(dto, user?.id);
  }

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body()
    request: Pick<Prisma.PostUpdateInput, 'imageUrl' | 'content' | 'title'>,
  ) {
    return this.postService.update(id, request, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  createMovieLike(
    @Param('id', ParseIntPipe) postId: number,
    @CurrentUser() user: User,
  ) {
    console.log(user);
    return this.postService.togglePostLike(postId, user.id, true);
  }

  @Post(':id/dislike')
  @UseGuards(JwtAuthGuard)
  createMovieDislike(
    @Param('id', ParseIntPipe) postId: number,
    @CurrentUser() user: User,
  ) {
    return this.postService.togglePostLike(postId, user.id, false);
  }
}
