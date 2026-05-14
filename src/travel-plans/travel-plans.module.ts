import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlan, TravelPlanSchema } from './schemas/travel-plan.schema'


import { CountriesModule } from '../countries/countries.module'


@Module({
  imports: [
    CountriesModule,

    MongooseModule.forFeature([
      {
        name: TravelPlan.name,
        schema: TravelPlanSchema,
      },
    ]),
  ],
  controllers: [TravelPlansController],

  providers: [TravelPlansService]

  
})
export class TravelPlansModule {}
