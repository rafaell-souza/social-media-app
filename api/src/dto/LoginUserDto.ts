import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';


export class LoginUserDto {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail()
    @MinLength(5)
    @MaxLength(50)
    
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]|(?=.*[\?\+$#@\)\(\=&%!*-]))[a-zA-Z0-9\?\+$#@\)\(\=&%!*-]+$/)

    password: string;
}