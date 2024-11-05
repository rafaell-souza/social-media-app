import { Controller, Get, Put, Post, Req, Res, Param, Body, Delete } from "@nestjs/common";
import { Request, Response } from "express";
import { CreatePostDto } from "src/dtos/CreatePostDto";
import { PostService } from "./post.service";
import { UpdatePostDto } from "src/dtos/UpdatePostDto";

@Controller("post")
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    async CreatePost(
        @Res() res: Response,
        @Req() req: Request,
        @Body() createPostDto: CreatePostDto
    ) {
        await this.postService.NewPost(req, createPostDto);
        return res.status(201).json({
            message: "New post created",
            success: true
        })
    }

    @Get("/:id?")
    async GetUserPosts(
        @Param("id") id: string,
        @Res() res: Response,
        @Req() req: Request
    ) {
        const posts = await this.postService.UserPosts(req, id);
        return res.status(200).json(posts)
    }

    @Get("all")
    async GetPosts() {
        return await this.postService.Posts();
    }

    @Put("/:postId")
    async UpdatePost(
        @Body() updatePostDto: UpdatePostDto,
        @Res() res: Response,
        @Req() req: Request,
        @Param("postId") postId: string
    ) {
        await this.postService.UpadtePost(req, Number(postId), updatePostDto.text);
        return res.status(200).json({
            message: `Post id: ${postId}, updated`,
            success: true
        })
    }

    @Delete("/:postId")
    async DeletePost(
        @Res() res: Response,
        @Req() req: Request,
        @Param("postId") postId: string
    ) {
        await this.postService.DeletePost(req, Number(postId));
        return res.status(200).json({
            message: `Post id: ${postId}, deleted`,
            success: true
        })
    }
}