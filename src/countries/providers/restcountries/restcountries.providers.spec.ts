import { Test, TestingModule } from '@nestjs/testing';
import { Restcountries } from './restcountries.provider';

describe('Restcountries', () => {
  let provider: Restcountries;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Restcountries],
    }).compile();

    provider = module.get<Restcountries>(Restcountries);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
