import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module'; // Import other modules
import { MealModule } from './meal/meal.module';
import { EventModule } from './event/event.module';
import { StaffModule } from './staff/staff.module';
import { GroceryModule } from './grocery/grocery.module';
import { UserModule } from './user/user.module';
import { GymModule } from './gym/gym.module';
import { RoomModule } from './room/room.module';
import { PlayZoneModule } from './play-zone/play-zone.module';
import { ComplainBoxController } from './complain-box/complain-box.controller';
import { ComplainBoxModule } from './complain-box/complain-box.module';
import { NoticeModule } from './notice/notice.module';
import { MailModule } from './mail/mail.module';
import { CartModule } from './cart/cart.module';
import { ParkingModule } from './parking/parking.module';
import { LockerModule } from './locker/locker.module';
import { FileModule } from './file.module';
import { BillingModule } from './billing/billing.module';


// Import other modules as needed

@Module({
  imports: [
  
    MealModule,
    AdminModule,
    EventModule,
    StaffModule,
    GroceryModule,
    UserModule,
    GymModule,
    RoomModule,
    PlayZoneModule,
    ComplainBoxModule,
    NoticeModule,
    MailModule,
   CartModule,
    ParkingModule,
    LockerModule,// Import other modules
    FileModule,UserModule, 
   BillingModule

  ],
  controllers: [ComplainBoxController],
})
export class AppModule {}
