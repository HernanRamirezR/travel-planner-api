import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from "mongoose";
import { Country, CountryDocument } from './schemas/country.schema';

import { RestCountriesProvider } from './providers/restcountries/restcountries.provider';

@Injectable()
export class CountriesService {
    constructor(@InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
    private readonly restCountriesProvider: RestCountriesProvider
    ){}

    async getByAlphaCode(alphaCode: string){
        
        let country = await this.countryModel.findOne({
            alpha3Code: alphaCode,
        });

        if (country){
            return country
        }

        const newCountry = await this.restCountriesProvider.getCountryByAlphaCode(alphaCode);

        country = await this.countryModel.create({
            alpha3Code: newCountry.cca3,
            name: newCountry.name.common,
            region: newCountry.region,
            capital: newCountry.capital?.[0],
            population: newCountry.population,
            flagUrl: newCountry.flags?.png,
        });

        return country
    }


}
