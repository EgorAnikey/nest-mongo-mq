import { Inject, Injectable } from '@nestjs/common';
import { CreateUserReq } from './dto/create-user.req';
import { UserRepository } from './user.repository';
import { UpdateUserReq } from './dto/update-user.req';
import { NOTIFICATIONS_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaginationUserReq } from './dto/pagination-user.req';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    @Inject(NOTIFICATIONS_SERVICE) private notificationsClient: ClientProxy,
  ) {}

  async create(data: CreateUserReq) {
    const t = await this.usersRepository.startTransaction();
    try {
      const user = await this.usersRepository.create(data, { session: t });
      await lastValueFrom(this.notificationsClient.emit('user_created', user));
      await t.commitTransaction();
      return user;
    } catch (err) {
      await t.abortTransaction();
      throw err;
    }
  }

  async update(data: UpdateUserReq) {
    return this.usersRepository.findOneAndUpdate(
      {
        _id: data._id,
      },
      data,
    );
  }

  async getList(pagination: PaginationUserReq = {}) {
    return this.usersRepository.find({}, pagination);
  }

  async getById(id: string) {
    return this.usersRepository.findOne({ _id: id });
  }

  async delete(id: string) {
    const t = await this.usersRepository.startTransaction();
    try {
      const user = await this.usersRepository.delete(id, { session: t });
      await lastValueFrom(
        this.notificationsClient.emit('user_deleted', { id }),
      );
      await t.commitTransaction();
      return user;
    } catch (err) {
      await t.abortTransaction();
      throw err;
    }
  }
}
