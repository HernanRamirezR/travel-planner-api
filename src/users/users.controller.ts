import { Body, Controller, Post, Delete, Param} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    create( @Body() body: { name: string; email: string}) {
        return this.usersService.create(body);
    }

    @Delete(':id')
    remove( @Param('id') id: string) {

        return this.usersService.remove(id);
    }

}
