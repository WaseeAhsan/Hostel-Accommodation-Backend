import { Injectable } from '@nestjs/common';
import { homeMessageType } from './app.datatype';

@Injectable()
export class AppService {

  setHomePage(): homeMessageType{
    const messageData = {
       message: "Welcome to Hostel Accommodation System", 
       pageInfo: "This is Home page", 
       inspireBy: "S M ABDULLAH SHAFI Sir", 
       developer: "K M Yeaser Arafat (21-449433-2) , Wasee Ahsan(21-44892-2)"
    }
    
    return messageData; 
  }
}
