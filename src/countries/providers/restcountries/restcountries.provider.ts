import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class RestCountriesProvider {

    constructor(private readonly httpService: HttpService,){}

    async getCountryByAlphaCode(alpha3Code: string){
    
        try {

            const url = `https://restcountries.com/v3.1/alpha/${alpha3Code}`;

            const response = await firstValueFrom(
                this.httpService.get(url)
            );

            return response.data[0]

        } catch{
            throw new NotFoundException(
                `Country with code ${alpha3Code} was not found`,
            )
        }

        
    }

       
}
