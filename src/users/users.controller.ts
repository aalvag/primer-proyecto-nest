import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    // if(!createUserDto.first_name || !createUserDto.email || !createUserDto.password ){
    //   throw new HttpException("Incomplet values", HttpStatus.BAD_REQUEST);
    // }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return {
      status:"sucess",
      users
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
   if(isNaN(+id)){
    throw new HttpException("Invalid Param", HttpStatus.BAD_REQUEST);
    
   }
    const user = this.usersService.findOne(+id);
     return {
      status:"sucess",
      user
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user =  this.usersService.update(+id, updateUserDto);
 return {
      status:"sucess",
      user
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
