import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    
    constructor( @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async create(body: {name: string; email: string}) {

        return this.userModel.create(body);
    }

    async remove(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}
