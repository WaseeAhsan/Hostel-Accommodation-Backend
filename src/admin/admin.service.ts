import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async getAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { name, email, password } = createAdminDto;

    const existingAdmin = await this.adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      throw new NotFoundException('Admin with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({ name, email, password: hashedPassword });
    return this.adminRepository.save(admin);
  }

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async getAdminProfileByName(name: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { name } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async updateAdmin(name: string, updateData: Partial<Admin>): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { name } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    Object.assign(admin, updateData);
    return this.adminRepository.save(admin);
  }
}
