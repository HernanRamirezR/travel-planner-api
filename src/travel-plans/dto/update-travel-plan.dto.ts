import { IsDateString, IsNotEmpty, IsNumber, IsString, Length,} from 'class-validator';

export class UpdateTravelPlanDto {

  @IsNumber()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;
}