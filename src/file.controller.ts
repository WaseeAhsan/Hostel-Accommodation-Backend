import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('file')
  export class FilesController {
    @Post('uploads')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    uploadFile(@UploadedFile() file) {
      if (!file) {
        throw new Error('No file uploaded');
      }
      return { filename: file.filename };
    }
  }
  