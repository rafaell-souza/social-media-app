import { Injectable } from "@nestjs/common";
import { ICreatePost } from "src/interfaces/IcreatePost";
import { PostRepository } from "src/repositories/post";

@Injectable()
export class PostService {
    constructor(
        private postRepo: PostRepository,
    ) { }

    async createPost(userId: string, data: ICreatePost) {
        await this.postRepo.create(userId, data);
    }

    async posts() {
        return await this.postRepo.findPosts();
    }

    async post(userId: string) {
        return await this.postRepo.findPosts(userId);
    }

    async updatePost(userId: string, post_id: number, text: string) {
        await this.postRepo.update(userId, post_id, text);
    }

    async deletePost(userId: string, post_id: number) {
        await this.postRepo.Delete(userId, post_id);
    }
}