import { Test, TestingModule } from '@nestjs/testing';
import { InformationRepoService } from './information-repo.service';

describe('InformationRepoService', () => {
  let service: InformationRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationRepoService]
    }).compile();

    service = module.get<InformationRepoService>(InformationRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
