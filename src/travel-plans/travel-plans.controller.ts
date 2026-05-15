import { Body, Controller, Post, Get, Param, Delete, Patch, Put} from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';


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

    @Get()
    findall(){
        return this.travelPlanService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.travelPlanService.findOne(id);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string){
        return this.travelPlanService.remove(id);
    }

    @Patch(':id/expenses')
    update(@Param('id') id: string,  @Body() updateTravelPlanDto: UpdateTravelPlanDto,){
        return this.travelPlanService.update(id, updateTravelPlanDto);
    }

}
