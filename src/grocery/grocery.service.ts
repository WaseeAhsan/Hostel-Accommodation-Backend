import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grocery } from './grocery.entity';
import { CreateGroceryDto } from './grocery.dto';  // Make sure the path is correct


@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(Grocery)
    private groceryRepository: Repository<Grocery>,
  ) {}

  // Get all groceries
  async getAllGroceries() {
    return this.groceryRepository.find();
  }

  // Create a new grocery item
  async createGrocery(createGroceryDto: CreateGroceryDto) {
    const grocery = this.groceryRepository.create(createGroceryDto);
    return this.groceryRepository.save(grocery);
  }

  // Update grocery item
async updateGrocery(id: number, updateData: Partial<Grocery>) {
    await this.groceryRepository.update(id, updateData);  // First, update the grocery item
    return this.groceryRepository.findOne({ where: { id } });  // Find the updated grocery item
  }
  

  // Delete grocery item
  async deleteGrocery(id: number){
    await this.groceryRepository.delete(id);
  }
}
