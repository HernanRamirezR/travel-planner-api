import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { TravelPlan, TravelPlanDocument } from './schemas/travel-plan.schema';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

import { CountriesService } from '../countries/countries.service';
import { ExpenseDto } from './dto/expense.dto';



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

    async addExpense(id: string, UpdateTravelPlanDto: ExpenseDto) {
        if (!isValidObjectId(id)) throw new BadRequestException('Invalid Travel Plan id');

        const travelPlan = await this.travelPlanModel.findByIdAndUpdate(
            id, 
            {$push: {expenses: UpdateTravelPlanDto}},
            { new: true }
        )
    
        return travelPlan
        
    }

}
