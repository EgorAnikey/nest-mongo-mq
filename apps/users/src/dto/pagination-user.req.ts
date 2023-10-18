import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationUserReq {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number;
}
