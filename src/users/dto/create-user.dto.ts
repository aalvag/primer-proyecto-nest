import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    first_name: string;
    last_name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    password: string;
    avatar: string
}
