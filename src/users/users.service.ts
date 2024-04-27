import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
users:Array<User>
constructor() {
  this.users = [];
}

  create(createUserDto: CreateUserDto):User {
   
   const newUser:User ={
    id: this.users.length + 1,
    first_name: createUserDto.first_name,
    last_name: createUserDto.last_name,
    email: createUserDto.email,
    password: createUserDto.password,
    avatar: createUserDto.avatar
   }   
    this.users.push(newUser)
    return newUser
  }

  findAll() {
    return this.users
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id)
  }

  update(id: number, updateUserDto: UpdateUserDto):User {
   const updatedUser ={
    id,
    ...updateUserDto
   }
   this.users[id-1] = updatedUser

   return this.users[id-1]
  }

  remove(id: number) {
   this.users.splice(id,1)
  }
}
