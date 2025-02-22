import { Module } from '@nestjs/common';
import { PlayZoneController } from './play-zone.controller';
import { PlayZoneService } from './play-zone.service';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { PlayZone } from './play-zone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlayZone])], 
  controllers: [PlayZoneController,AppController],
  providers: [PlayZoneService,AppService]
})
export class PlayZoneModule {}
