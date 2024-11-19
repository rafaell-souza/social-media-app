import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export default class AuthResetPasswordDto {
    @IsString()
    @IsNotEmpty({ message: "Please, provide a valid password" })
    @Length(8,12)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]|(?=.*[\?\+$#@\)\(\=&%!*-]))[a-zA-Z0-9\?\+$#@\)\(\=&%!*-]+$/)

    password: string;
}