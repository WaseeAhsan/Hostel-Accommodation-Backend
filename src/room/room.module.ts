import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { Room } from './room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'hostel',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  
    TypeOrmModule.forFeature([Room]), // Entity যুক্ত করা হয়েছে
  ],
  controllers: [RoomController,AppController],
  providers: [RoomService,AppService]
})
export class RoomModule {}
