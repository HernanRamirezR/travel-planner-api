import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TravelPlansService } from './travel-plans.service';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlan, TravelPlanSchema } from './schemas/travel-plan.schema'

import { UsersModule } from '../users/users.module';
import { CountriesModule } from '../countries/countries.module'


@Module({
  imports: [
    CountriesModule,
    UsersModule,

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
