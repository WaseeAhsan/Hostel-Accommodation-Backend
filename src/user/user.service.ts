import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Show All User Information
  async getAll_Users() {
    return await this.userRepository.find();
  }

  // Search User by using user_id
  async getSearchUser(user_id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    return user || null; // Return null if the user is not found
  }

  // Validate User credentials
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // Add New User
  async addNewUser(user: Partial<User>) {
    // Create and save the new user
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    
    return newUser;
  }
  
  // Update User Information
  async updateUser(user_id: string, updateUser: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      return { message: 'User not found!' };
    }

    await this.userRepository.update(user.id, updateUser);
    return {
      message: 'User updated successfully!',
      updatedUser: { ...user, ...updateUser },
    };
  }

  // Delete User Information
  async deleteUser(user_id: string) {
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      return { message: 'User not found!' };
    }

    await this.userRepository.delete(user.id);
    return {
      message: `User with ID ${user_id} deleted successfully.`,
      deletedUser: user,
    };
  }
}
