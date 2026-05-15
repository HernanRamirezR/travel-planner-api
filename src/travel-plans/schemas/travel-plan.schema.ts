import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Expense, ExpenseSchema } from './expenses.schema';


export type TravelPlanDocument = HydratedDocument<TravelPlan>;
@Schema({ timestamps: true })
export class TravelPlan {

    @Prop({ required: true, unique: true })
    title!: string;

    @Prop({ required: true })
    startDate!: Date;

    @Prop({ required: true })
    endDate!: Date;

    @Prop({ required: true })
    countryCode!: string;

    @Prop({type: [ExpenseSchema], default: [],
    
    })
    expenses!: Expense[];


    
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
