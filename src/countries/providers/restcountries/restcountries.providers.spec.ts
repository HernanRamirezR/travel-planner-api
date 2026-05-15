import { Test, TestingModule } from '@nestjs/testing';
import { RestCountriesProvider } from './restcountries.provider';

describe('Restcountries', () => {
  let provider: RestCountriesProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestCountriesProvider],
    }).compile();

    provider = module.get<RestCountriesProvider>(RestCountriesProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
