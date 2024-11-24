import { IsOptional, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/i)

    first_name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]+$/i)

    last_name?: string;

    @IsOptional()
    @IsString()

    photo?: string;

    @IsOptional()
    @IsString()

    background?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.-]+$/m)

    bio?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9,\(\) -]+$/)

    from?: string;

    @IsOptional()
    @IsString()
    @MaxLength(40)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '-]+$/i)

    site?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?(\/[^\s]*)?$/, { message: "URL must be a valid URL." })

    url?: string;
}
