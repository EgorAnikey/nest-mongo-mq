import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserReq } from './dto/create-user.req';
import { UpdateUserReq } from './dto/update-user.req';
import { PaginationUserReq } from './dto/pagination-user.req';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() req: CreateUserReq) {
    return this.usersService.create(req);
  }

  @Put()
  async update(@Body() req: UpdateUserReq) {
    return this.usersService.update(req);
  }

  @Get()
  async getList(@Query() query: PaginationUserReq) {
    return this.usersService.getList(query);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
