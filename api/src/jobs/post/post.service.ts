import { Injectable } from "@nestjs/common";
import { JwtService } from "src/helpers/jwt.service";
import { ICreatePost } from "src/interfaces/IcreatePost";
import { PostRepository } from "src/repositories/PostRepository";
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
            return await this.postRepo.findPosts(userId);
        }

        return await this.postRepo.findPosts(id);
    }


    async Posts() {
        return await this.postRepo.findPosts();
    }


    async UpadtePost(req: Request, postId: number, text: string) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);
        await this.postRepo.update(userId, postId, text);
    }


    async DeletePost(req: Request, postId: number) {
        const access_token = req.headers.authorization.split(" ")[1];
        const userId = this.jwtService.decode(access_token);
        await this.postRepo.Delete(userId, postId);
    }
}