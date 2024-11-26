import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiFile } from './decorators/api-file.decorator';

@Controller('common')
export class CommonController {
  @Post('image')
  @UseGuards(JwtAuthGuard)
  @ApiFile('image', {
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
  })
  createImage(@UploadedFile() image: Express.Multer.File) {
    return {
      imageUrl: image.filename,
    };
  }
}
