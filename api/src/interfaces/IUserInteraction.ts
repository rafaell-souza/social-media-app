export interface IUserInteraction {
    userId: string;
    interactionId: number;
    type: "COMMENT" | "POST"
    contentId: number
}