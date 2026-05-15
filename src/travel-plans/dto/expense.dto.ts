import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, Length,} from 'class-validator';

export class ExpenseDto {

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsString()
    @IsNotEmpty()
    description!: string;
}