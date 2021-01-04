import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class AuthUser {
    @Field()
    id: number;

    @Field()
    email: string;

    @Field()
    accessToken: string;
}
