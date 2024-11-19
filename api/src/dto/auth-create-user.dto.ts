import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength, } from 'class-validator';

export default class AuthCreateUserDto {
    @IsString()
    @IsNotEmpty({ message: "First name must have a valid value." })
    @Length(5, 50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/i)

    first_name: string;

    @IsString()
    @IsNotEmpty({ message: "Last name must have a valid value." })
    @Length(5, 50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/i)

    last_name: string

    @IsNotEmpty({ message: "Email must have a valid value." })
    @IsEmail()
    @Length(5, 50)

    email: string;

    @IsString()
    @IsNotEmpty({ message: "Password must have a valid value." })
    @Length(8, 12)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]|(?=.*[\?\+$#@\)\(\=&%!*-]))[a-zA-Z0-9\?\+$#@\)\(\=&%!*-]+$/)

    password: string;
}