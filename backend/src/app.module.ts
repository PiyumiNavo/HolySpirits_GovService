import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentsModule } from './departments/departments.module';
import { LocationsModule } from './locations/locations.module';
import { GovServicesModule } from './gov-services/gov-services.module';
import { FilesModule } from './files/files.module';
import { MailModule } from './mail/mail.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './common/guards/jwt/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so we don't have to import everywhere
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    UsersModule,
    DepartmentsModule,
    LocationsModule,
    GovServicesModule,
    FilesModule,
    MailModule,
    SchedulerModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
