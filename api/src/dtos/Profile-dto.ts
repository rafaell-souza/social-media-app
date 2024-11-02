import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '-]+$/i, { message: "Name can only contain letters, numbers, spaces, hyphens, and apostrophes." })
    name?: string;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsOptional()
    @IsString()
    background?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.]+$/m, { message: "Bio can contain up to 100 characters, including letters, numbers, commas, and periods." })
    bio?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9,() -]+$/, { message: "From can contain up to 50 characters, including letters, numbers, commas, parentheses, and spaces." })
    from?: string;

    @IsOptional()
    @IsString()
    @MaxLength(40)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 '-]+$/i, { message: "Site can only contain letters, numbers, spaces, hyphens, and apostrophes." })
    site?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?(\/[^\s]*)?$/, { message: "URL must be a valid URL." })
    url?: string;
}
