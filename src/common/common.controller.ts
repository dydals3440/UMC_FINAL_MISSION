import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('common')
export class CommonController {
  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 20000000,
      },
      fileFilter(req, file, callback) {
        if (file.mimetype !== 'image/png') {
          return callback(
            new BadRequestException('PNG 타입의 파일만 업로드 가능합니다.'),
            false,
          );
        }

        return callback(null, true);
      },
    }),
  )
  createImage(@UploadedFile() image: Express.Multer.File) {
    return {
      imageUrl: image.filename,
    };
  }
}
