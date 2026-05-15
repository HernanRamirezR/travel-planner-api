import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({_id: true, timestamps:true})
export class Expense {
    @Prop({required: true}) amount!: number;

    @Prop({required: true}) description!: string;

    @Prop({required: false}) category!: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);