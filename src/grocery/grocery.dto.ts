import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateGroceryDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsNotEmpty({ message: 'Category cannot be empty' })
  category: string;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be a positive number' })
  quantity: number;
}
