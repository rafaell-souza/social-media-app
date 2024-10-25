export interface IUserCreate {
    id: string;
    name: string;
    email: string;
    password?: string;
    photo?: string;
    verified?: boolean;
    refresh_token: string
}