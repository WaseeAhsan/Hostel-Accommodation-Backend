import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './file.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Define the upload directory
    }),
  ],
  controllers: [FilesController],
})
export class FileModule {}
