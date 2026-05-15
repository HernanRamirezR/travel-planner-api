import { IsDateString, IsNotEmpty, IsString, Length,} from 'class-validator';

export class CreateTravelPlanDto {

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsString()
  @Length(3, 3)
  countryCode!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
  
}