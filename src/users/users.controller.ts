import { Body, Controller, Post, Delete, Param, Get} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    create( @Body() body: { name: string; email: string}) {
        return this.usersService.create(body);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {

        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove( @Param('id') id: string) {

        return this.usersService.remove(id);
    }

}
