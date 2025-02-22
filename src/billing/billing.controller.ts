import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Billing } from './billing.entity';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  findAll(): Promise<Billing[]> {
    return this.billingService.findAll();
  }

  @Get('/:user_id')
  findOne(@Param('user_id') user_id: string): Promise<Billing> {
    return this.billingService.findOne(user_id);
  }

  @Post('/addNewBilling')
async addBilling(@Body() billingData: { user_id: string; room_type: string; meal_purchase: string; total: number }) {
  // Validate user_id
  if (!billingData.user_id || typeof billingData.user_id !== 'string') {
    return { message: "Invalid user ID." };
  }
  
  // Validate room_type
  if (!billingData.room_type || typeof billingData.room_type !== 'string') {
    return { message: "Invalid room type." };
  }

  // Validate meal_purchase
  if (!billingData.meal_purchase || typeof billingData.meal_purchase !== 'string') {
    return { message: "Invalid meal purchase." };
  }

  // Validate total
  if (billingData.total === undefined || typeof billingData.total !== 'number') {
    return { message: "Invalid total amount." };
  }

  // Call service to add the new billing record
  return this.billingService.create(billingData); 
}


  @Put(':user_id')
  async update(@Param('user_id') user_id: string, @Body() billingData: any): Promise<{ message: string }> {
    await this.billingService.update(user_id, billingData);
    return { message: 'Billing record updated successfully' };
  }

  @Delete('/delete/:user_id')
  async remove(@Param('user_id') user_id: string): Promise<{ message: string }> {
    await this.billingService.remove(user_id);
    return { message: 'Billing record deleted successfully' };
  }
}
