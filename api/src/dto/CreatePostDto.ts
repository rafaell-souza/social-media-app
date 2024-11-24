import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";


export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(700)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \.,'"\(\)\+\=\&\{\};:><%\$#@\!\?\|\]\[\/\]_\*-]+$/i)
    text: string;
}