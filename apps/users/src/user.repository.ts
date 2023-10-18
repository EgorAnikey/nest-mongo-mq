import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import {
  Connection,
  FilterQuery,
  Model,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { PaginationUserReq } from './dto/pagination-user.req';

@Injectable()
export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(
    document: Omit<User, '_id'>,
    options?: SaveOptions,
  ): Promise<User> {
    const createdUser = new this.userModel(document);
    return (await createdUser.save(options)).toJSON() as unknown as User;
  }

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    const user = await this.userModel.findOne(filterQuery, {}, { lean: true });

    if (!user) {
      this.logger.warn('User not found with filterQuery', filterQuery);
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    update: UpdateQuery<User>,
    options?: SaveOptions,
  ) {
    const user = await this.userModel.findOneAndUpdate(filterQuery, update, {
      ...options,
      lean: true,
      new: true,
    });

    if (!user) {
      this.logger.warn(`User not found with filterQuery:`, filterQuery);
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async find(
    filterQuery?: FilterQuery<User>,
    { limit, page }: PaginationUserReq = {},
  ) {
    if (limit && page) {
      const skip = limit * (page - 1);

      return this.userModel
        .find(filterQuery, {}, { lean: true })
        .skip(skip)
        .limit(limit);
    } else {
      return this.userModel.find(filterQuery, {}, { lean: true });
    }
  }

  async delete(id: Types.ObjectId | string, options?: SaveOptions) {
    const deleted = await this.userModel.deleteOne({ _id: id }, { ...options });

    if (!deleted.deletedCount) {
      this.logger.warn(`User not found with _id:`, id);
      throw new NotFoundException('User not found.');
    }

    return true;
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
