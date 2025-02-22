import { Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gym } from './gym.entity';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gym])], // Import TypeOrmModule with Gym entity
  controllers: [GymController,AppController],
  providers: [GymService,AppService],
})
export class GymModule {}