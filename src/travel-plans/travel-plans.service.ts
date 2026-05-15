import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TravelPlan, TravelPlanDocument } from './schemas/travel-plan.schema';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

import { CountriesService } from '../countries/countries.service';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';



@Injectable()
export class TravelPlansService {

    constructor(
    @InjectModel(TravelPlan.name)
    private travelPlanModel: Model<TravelPlanDocument>,

    private readonly countriesService: CountriesService,
    ) {}

    async create(createTravelPlanDto: CreateTravelPlanDto) {

        await this.countriesService.getByAlphaCode(
            createTravelPlanDto.countryCode,
        );

        const travelPlan = await this.travelPlanModel.create({
            title: createTravelPlanDto.title,
            startDate: createTravelPlanDto.startDate,
            endDate: createTravelPlanDto.endDate,
            countryCode: createTravelPlanDto.countryCode.toUpperCase(),
        });

        return travelPlan;
    }

    async findAll() {
        return this.travelPlanModel.find();
    }
    
    async findOne(id: string) {
        return this.travelPlanModel.findById(id);
    }

    async remove(id: string){
        return this.travelPlanModel.findByIdAndDelete(id);
    }

    async update(id: string, UpdateTravelPlanDto: UpdateTravelPlanDto) {

        let travelPlan = await this.travelPlanModel.findById(id)
        if (travelPlan){
            travelPlan.expenses = UpdateTravelPlanDto;
            travelPlan.save()
        }

        return travelPlan
        
    }

}
