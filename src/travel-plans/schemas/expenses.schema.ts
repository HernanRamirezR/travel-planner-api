import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({_id: true, timestamps:true})
export class Expenses {
    @Prop({required: true}) amount!: number;

    @Prop({required: true}) description!: string;

    @Prop({required: false}) category!: string;

}

export const ExpensesSchema = SchemaFactory.createForClass(Expenses);