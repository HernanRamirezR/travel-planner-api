import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { HttpModule } from '@nestjs/axios';


import { CountriesService } from './countries.service';
import { Country, CountrySchema } from './schemas/country.schema'
import { RestCountriesProvider } from './providers/restcountries/restcountries.provider';

@Module({
  imports: [
    HttpModule,

    MongooseModule.forFeature([
      {
        name: Country.name,
        schema: CountrySchema,
      },
    ]),
  ],
  providers: [CountriesService, RestCountriesProvider],
  exports: [CountriesService],
})
export class CountriesModule {}
