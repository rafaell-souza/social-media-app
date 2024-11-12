import { Module } from "@nestjs/common";
import { InteractionController } from "./interaction.controller";
import { HelperModule } from "src/helpers/helper.module";
import { UserInteractionRepository } from "src/repositories/UserInteractionRepository";

@Module({
    providers: [InteractionController, UserInteractionRepository],
    imports: [HelperModule]
})
export class InteractionModule { }