import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthModule } from '../auth.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    AuthModule,
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
    TypeOrmModule.forFeature([User]), // Feature-specific entity
  ],
  providers: [UserService,AppService], // Register UserService
  controllers: [UserController,AppController], // Register UserController
  exports: [UserService], // Export UserService for use in other modules
})
export class UserModule {}