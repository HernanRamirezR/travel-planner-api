import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { UsersModule } from './users/users.module';

import { AuditMiddleware } from './common/middleware/audit.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27017/travel_planner?authSource=admin',
    ),
    CountriesModule,
    TravelPlansModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure( consumer:MiddlewareConsumer){
    consumer.apply(AuditMiddleware).forRoutes('travel-plans', 'users')
  }
}
