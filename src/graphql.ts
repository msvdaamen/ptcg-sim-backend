
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface PaginationArgs {
    page: number;
    amount: number;
}

export interface CardFilterInput {
    name?: string;
    rarity?: number;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface ImageEntity {
    id: number;
    name: string;
    filename: string;
    url: string;
}

export interface CardEntity {
    id: number;
    name: string;
    hp?: string;
    number?: string;
    nationalPokedexNumber?: number;
    description?: string;
    image?: ImageEntity;
    imageHRes?: ImageEntity;
    hasCard: boolean;
}

export interface AuthUser {
    id: number;
    email: string;
    accessToken: string;
}

export interface PaginationModel {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
}

export interface CardPaginationModel {
    cards: CardEntity[];
    pagination: PaginationModel;
}

export interface IQuery {
    hello(): string | Promise<string>;
    cardsPaginated(pagination: PaginationArgs, filter?: CardFilterInput): CardPaginationModel | Promise<CardPaginationModel>;
    myCards(): CardEntity[] | Promise<CardEntity[]>;
}

export interface IMutation {
    login(loginCredentials: LoginInput): AuthUser | Promise<AuthUser>;
    register(registerCredentials: RegisterInput): AuthUser | Promise<AuthUser>;
}
