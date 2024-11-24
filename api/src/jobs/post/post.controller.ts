import { Controller, Get, Put, Post, Req, Param, Body, Delete, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "src/dto/CreatePostDto";
import { PostService } from "./post.service";
import { UpdatePostDto } from "src/dto/UpdatePostDto";
import { JwtAuthOptional } from "src/guards/auth-optional.guard";

@Controller("post")
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    async createPost(
        @Req() req: any,
        @Body() dto: CreatePostDto,
    ) {
        const userId: string = req.user.id;
        return await this.postService.createPost(userId, dto);
    }

    @Get("all")
    async posts() {
        return await this.postService.posts();
    }

    @Get("/:id?")
    @UseGuards(JwtAuthOptional)
    async post(
        @Req() req: any,
        @Param("id") id?: string
    ) {
        if (id === "all") return this.postService.posts();

        const userId = req?.user?.id;
        return await this.postService.post(id ? id : userId);
    }

    @Put("/:post_id")
    async updatePost(
        @Body() dto: UpdatePostDto,
        @Req() req: any,
        @Param("post_id") post_id: number
    ) {
        const userId: string = req.user.id;
        return await this.postService.updatePost(userId, post_id, dto.text);
    }

    @Delete("/:post_id")
    async deletePost(
        @Req() req: any,
        @Param("post_id") post_id: number
    ) {
        const userId: string = req.user.id;
        return await this.postService.deletePost(userId, post_id);
    }
}