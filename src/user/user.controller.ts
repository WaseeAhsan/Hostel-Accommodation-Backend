import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users
  @Get()
  getAllUsers() {
    return this.userService.getAll_Users();
  }

  // Search a user by user_id
  @Get(':user_id')
  async searchUser(@Param('user_id') user_id: string) {
    const user = await this.userService.getSearchUser(user_id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  // Register a new user
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async register(@Body() body: any) {
    const { email, password, user_id, fullName } = body;

    const existingUser = await this.userService.getSearchUser(user_id);
    if (existingUser) {
      throw new ConflictException('User ID already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.addNewUser({
      email,
      password: hashedPassword,
      user_id,
      fullName,
    });
  }

  // User login (Validation Only, No JWT)
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async login(@Body() body: any) {
    const { email, password } = body;

    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      message: 'Login successful',
      user_id: user.user_id,
      fullName: user.fullName,
    };
  }

  // Update user details by user_id
  @Put('update/:user_id')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async updateUser(@Param('user_id') user_id: string, @Body() body: any) {
    const { email, password, fullName } = body;

    const updatedUser = await this.userService.updateUser(user_id, { email, password, fullName });
    if (!updatedUser) {
      throw new UnauthorizedException('User not found or failed to update');
    }
    return updatedUser;
  }

  // Delete user by user_id
  @Delete('delete/:user_id')
  async deleteUser(@Param('user_id') user_id: string) {
    const deleted = await this.userService.deleteUser(user_id);
    if (!deleted) {
      throw new UnauthorizedException('User not found or failed to delete');
    }
    return { message: 'User deleted successfully' };
  }
}
