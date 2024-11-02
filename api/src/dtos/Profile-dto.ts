import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @Matches(/^[a-z ]+$/i)
    name?: string

    @IsOptional()
    @IsString()
    photo?: string

    @IsOptional()
    @IsString()
    background?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.]+$/)
    bio?: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9,\(\) -]+$/)
    from?: string

    @IsOptional()
    @IsString()
    @MaxLength(40)
    site?: string

    @IsOptional()
    @IsString()
    url?: string
}