import { Injectable } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { ICreatePost } from "src/interfaces/IcreatePost";
import { PostRepository } from "src/repositories/postRepository";
import { Request } from "express";
import { NoContent } from "src/exceptions/excepetion";

@Injectable()
export class PostService {
    constructor(
        private postRepo: PostRepository,
        private jwtService: JwtService
    ) { }

    async NewPost(req: Request, data: ICreatePost) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);
        await this.postRepo.create(userId, data);
    }

    async UserPosts(req?: Request, id?: string) {
        if (!id) {
            const access_token = req.headers.authorization.split(" ")[1];
            const userId = this.jwtService.decode(access_token);
            const posts = await this.postRepo.findPosts(userId);
            return posts ? posts : [];
        }

        const posts = await this.postRepo.findPosts(id);
        return posts ? posts : [];
    }

    async Posts() {
        const posts = await this.postRepo.findPosts();
        return posts ? posts : [];
    }

    async UpadtePost(req: Request, postId: number, text: string) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);

        const post = await this.postRepo.update(userId, postId, text);

        if (!post)
            throw new NoContent("content no found. Try again later");
    }

    async DeletePost(req: Request, postId: number) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);

        const post = await this.postRepo.Delete(userId, postId);

        if (!post)
            throw new NoContent("content no found. Try again later");
    }
}