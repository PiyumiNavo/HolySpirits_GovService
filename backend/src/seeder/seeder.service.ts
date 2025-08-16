import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Seed the database with initial data when the application starts
   */
  async onModuleInit() {
    this.logger.log('Seeding database...');
    await this.seedUsers();
    this.logger.log('Database seeding completed');
  }

  /**
   * Seed admin and test users if they don't already exist
   */
  private async seedUsers() {
    // Get default admin credentials from config or use default values
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') || 'admin@egov.lk';
    const adminPassword =
      this.configService.get<string>('ADMIN_PASSWORD') || 'Admin@123';
    const adminExists = await this.usersService.findOneByEmail(adminEmail);

    if (!adminExists) {
      this.logger.log('Creating system admin user');

      // Direct database insertion to bypass any validation or hooks
      // that might prevent us from creating an admin user programmatically
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const admin = new this.userModel({
        name: 'System Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.SYSTEM_ADMIN,
        isVerified: true,
        notificationPreferences: {
          email: true,
          sms: false,
        },
      });

      await admin.save();
      this.logger.log('System admin created successfully');
    } else {
      this.logger.log('System admin already exists');
    }

    // Seed a test citizen user if enabled by config
    if (this.configService.get<string>('CREATE_TEST_USERS') === 'true') {
      const testCitizenEmail = 'citizen@example.com';
      const testCitizenPassword =
        this.configService.get<string>('TEST_USER_PASSWORD') || 'Citizen@123';
      const testCitizenExists =
        await this.usersService.findOneByEmail(testCitizenEmail);

      if (!testCitizenExists) {
        this.logger.log('Creating test citizen user');

        const hashedPassword = await bcrypt.hash(testCitizenPassword, 10);

        const citizen = new this.userModel({
          name: 'Test Citizen',
          email: testCitizenEmail,
          password: hashedPassword,
          role: UserRole.CITIZEN,
          isVerified: true,
          notificationPreferences: {
            email: true,
            sms: false,
          },
        });

        await citizen.save();
        this.logger.log('Test citizen created successfully');
      }
    }
  }
}
