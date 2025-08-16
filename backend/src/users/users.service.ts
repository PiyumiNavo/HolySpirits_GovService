import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: Types.ObjectId): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password } = createUserDto;

    // Check if user with email already exists
    const existingUser = await this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword, // Store hashed password
    });

    return newUser.save();
  }

  async addVerificationDocument(
    userId: Types.ObjectId,
    documentData: any,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $push: { verificationDocuments: documentData },
        },
        { new: true },
      )
      .exec();
  }

  async verifyUser(
    userId: Types.ObjectId,
    verifiedBy: Types.ObjectId,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          isVerified: true,
          verificationDate: new Date(),
          verifiedBy,
        },
        { new: true },
      )
      .exec();
  }

  async verifyDocument(
    userId: Types.ObjectId,
    documentId: Types.ObjectId,
    verifiedBy: Types.ObjectId,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
          'verificationDocuments._id': documentId,
        },
        {
          $set: {
            'verificationDocuments.$.verified': true,
            'verificationDocuments.$.verificationDate': new Date(),
            'verificationDocuments.$.verifiedBy': verifiedBy,
          },
        },
        { new: true },
      )
      .exec();
  }

  async updateNotificationPreferences(
    userId: Types.ObjectId,
    preferences: { email?: boolean; sms?: boolean },
  ): Promise<UserDocument | null> {
    const updateData: Record<string, boolean> = {};

    if (preferences.email !== undefined) {
      updateData['notificationPreferences.email'] = preferences.email;
    }

    if (preferences.sms !== undefined) {
      updateData['notificationPreferences.sms'] = preferences.sms;
    }

    return this.userModel
      .findByIdAndUpdate(userId, { $set: updateData }, { new: true })
      .exec();
  }
}
