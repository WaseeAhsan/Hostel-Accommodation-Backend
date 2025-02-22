import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Billing } from './billing.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) {}

  findAll(): Promise<Billing[]> {
    return this.billingRepository.find();
  }

  findOne(user_id: string): Promise<Billing> {
    const options: FindOneOptions<Billing> = { where: { user_id } };
    return this.billingRepository.findOne(options);
  }

  async create(data: any) {
    try {
      const newBilling = this.billingRepository.create(data);
      await this.billingRepository.save(newBilling);
      return {
        message: "Billing record created successfully!",
        data: newBilling,
      };
    } catch (error) {
      console.error("Error creating billing record:", error);
      throw new Error("Failed to create billing record");
    }
  }
  
  
  async update(user_id: string, billingData: any): Promise<void> {
    await this.billingRepository.update({ user_id }, billingData);
  }

  async remove(user_id: string): Promise<void> {
    await this.billingRepository.delete({ user_id });
  }
}
