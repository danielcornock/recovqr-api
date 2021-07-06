import { Test, TestingModule } from '@nestjs/testing';
import { IpLookupService } from './ip-lookup.service';

describe('IpLookupService', () => {
  let service: IpLookupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpLookupService]
    }).compile();

    service = module.get<IpLookupService>(IpLookupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
