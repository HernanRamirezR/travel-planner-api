import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CountryDocument = HydratedDocument<Country>;
@Schema({ timestamps: true })
export class Country {
    @Prop({ required: true, unique: true })
    alpha3Code!: string;

    @Prop({ required: true })
    name!: string;

    @Prop()
    region!: string;

    @Prop()
    capital!: string;

    @Prop()
    population!: number;

    @Prop()
    flagUrl!: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
