import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './admin.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Post('register')
async register(@Body() createAdminDto: CreateAdminDto) {
  const admin = await this.adminService.createAdmin(createAdminDto);

  return {
    message: 'Admin registered successfully',
    adminId: admin.id,  
  };
}


@Post('login')
async login(
  @Body('email') email: string,
  @Body('password') password: string,
): Promise<{ message: string; accessToken: string; name: string }> {
  const admin = await this.adminService.validateAdmin(email, password);
  const token = this.jwtService.sign({ id: admin.id, email: admin.email });

  return {
    message: 'Login successful',
    accessToken: token,
    name: admin.name, // ✅ এখানে নাম পাঠানো হচ্ছে
  };
}


  @Get(':name')
  async getAdminProfile(@Param('name') name: string): Promise<Admin> {
    return this.adminService.getAdminProfileByName(name);
  }

  @Put('update/:name')
  async updateAdmin(
    @Param('name') name: string,
    @Body() updateData: Partial<Admin>,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(name, updateData);
  }
}
