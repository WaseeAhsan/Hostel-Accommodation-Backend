import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing } from './billing.entity';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

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
      synchronize: true, // Auto-sync entities with the database (be careful in production!)
    }),
    TypeOrmModule.forFeature([Billing]), // Feature-specific entity
  ],
  providers: [BillingService,AppService],
  controllers: [BillingController,AppController]
})
export class BillingModule {}
