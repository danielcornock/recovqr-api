import { Test, TestingModule } from '@nestjs/testing';
import { TagRepoService } from './tag-repo.service';

describe('TagRepoService', () => {
  let service: TagRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagRepoService],
    }).compile();

    service = module.get<TagRepoService>(TagRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
