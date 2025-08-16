import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UsersModule } from '../users/users.module';
import { DepartmentsModule } from '../departments/departments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    DepartmentsModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
