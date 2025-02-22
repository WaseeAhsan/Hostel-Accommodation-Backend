import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [CartController,AppController],
  providers: [CartService,AppService]
})
export class CartModule {}
