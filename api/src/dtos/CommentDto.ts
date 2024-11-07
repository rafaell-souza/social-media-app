import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";


export class CommentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(700)
    @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 \.,]+$/i)
    text: string;
}