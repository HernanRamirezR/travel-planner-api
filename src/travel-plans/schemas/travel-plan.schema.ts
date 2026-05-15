import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Expenses, ExpensesSchema } from './expenses.schema';


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

    @Prop({type: [ExpensesSchema], default: [],
    
    })
    expenses!: Expenses;


    
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
