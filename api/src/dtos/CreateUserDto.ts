import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export default class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @Matches(/^[a-z ]+$/i)
    name: string;

    @IsNotEmpty({message: "Email is required"})
    @IsEmail()
    @MinLength(5)
    @MaxLength(50)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9\?\+$#@\)\(\=&%!*-])[a-zA-Z0-9\?\+$#@\)\(\=&%!*-]+$/)
    password: string;
}