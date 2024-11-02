import {
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export default class ResetPasswordAuthDto {
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]|(?=.*[\?\+$#@\)\(\=&%!*-]))[a-zA-Z0-9\?\+$#@\)\(\=&%!*-]+$/)
    password: string;
}