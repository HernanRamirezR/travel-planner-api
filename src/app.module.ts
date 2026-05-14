import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27017/travel_planner?authSource=admin',
    ),
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
