import { Document, LeanDocument, Model } from 'mongoose';
import { PaginationOptions } from '../interfaces/pagination-options.interface';

export class BaseRepoService<T extends Omit<LeanDocument<Document>, '__v'>> {
  constructor(protected repo: Model<T>) {}

  public getPaginated(query: Partial<T>, { pageSize, page }: PaginationOptions): Promise<T[]> {
    const offset = pageSize * page;

    return this.repo.find(query)
      .sort('-createdAt')
      .limit(pageSize)
      .skip(offset)
      .exec();
  }

  public getCount(query: Partial<T>): Promise<number> {
    return this.repo.find(query).count().exec();
  }
}