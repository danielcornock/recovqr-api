import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepoService } from './auth-repo.service';

describe('AuthRepoService', () => {
  let service: AuthRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepoService]
    }).compile();

    service = module.get<AuthRepoService>(AuthRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
