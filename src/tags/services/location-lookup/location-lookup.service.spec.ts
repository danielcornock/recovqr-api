import { Test, TestingModule } from '@nestjs/testing';
import { LocationLookupService } from './location-lookup.service';

describe('LocationLookupService', () => {
  let service: LocationLookupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationLookupService]
    }).compile();

    service = module.get<LocationLookupService>(LocationLookupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
