import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    ValidateIf
} from 'class-validator';

export default class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @Matches(/^[a-z ]+$/i)
    name: string;

    @ValidateIf((o) => !o.phone)
    @IsNotEmpty({message: "Email or phone is required"})
    @IsEmail()
    @MinLength(5)
    @MaxLength(50)
    email?: string;

    @ValidateIf((o) => !o.email)
    @IsNotEmpty({message: "Email or phone is required"})
    @MinLength(15)
    @MaxLength(15)
    @Matches(/^\(\d{2}\) \d{5}-\d{4}$/)
    phone?: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9\?\+$#@\)\(\=&%!*-])[a-zA-Z0-9\?\+$#@\)\(\=&%!*-]+$/)
    password: string;
}