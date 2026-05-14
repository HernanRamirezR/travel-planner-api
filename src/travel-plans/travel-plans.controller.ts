import { Body, Controller, Post } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {

    constructor(
        private readonly travelPlanService: TravelPlansService
    ){}

    @Post()
    create(
        @Body() CreateTravelPlanDto: CreateTravelPlanDto,
    ){
        return this.travelPlanService.create(CreateTravelPlanDto);
    }

}
