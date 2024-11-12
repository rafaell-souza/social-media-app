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

    @Get("all")
    async GetPosts() {
        return await this.postService.Posts();
    }

    @Get("/:id?")
    async GetUserPosts(
        @Param("id") id: string,
        @Res() res: Response,
        @Req() req: Request
    ) {
        if (id === "all") return this.postService.Posts();
        const posts = await this.postService.UserPosts(req, id);
        return res.status(200).json(posts)
    }

    @Put("/:id")
    async UpdatePost(
        @Body() updatePostDto: UpdatePostDto,
        @Res() res: Response,
        @Req() req: Request,
        @Param("id") id: string
    ) {
        await this.postService.UpadtePost(req, Number(id), updatePostDto.text);
        return res.status(200).json({
            message: `Post id: ${id}, updated`,
            success: true
        })
    }

    @Delete("/:id")
    async DeletePost(
        @Res() res: Response,
        @Req() req: Request,
        @Param("id") id: string
    ) {
        await this.postService.DeletePost(req, Number(id));
        return res.status(200).json({
            message: `Post id: ${id}, deleted`,
            success: true
        })
    }
}