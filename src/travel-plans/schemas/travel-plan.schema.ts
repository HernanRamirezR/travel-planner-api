import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

type Expenses = { 
    description: string, 
    amount: number,
    category?: string
};

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

    @Prop({type: {
            description: { type: String, required: true },
            amount: { type: Number, required: true },
            category: { type: String }
        },
    
    })
    expenses!: Expenses;


    
}

export const TravelPlanSchema = SchemaFactory.createForClass(TravelPlan);
