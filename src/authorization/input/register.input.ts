import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty} from "class-validator";

@InputType()
export class RegisterInput {

    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @IsNotEmpty()
    @Field()
    password: string;

    @IsNotEmpty()
    @Field()
    passwordConfirmation: string;
}
