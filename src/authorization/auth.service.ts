import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {UserRepository} from "../models/users/user.repository";
import {UserEntity} from "../models/users/entities/user.entity";
import {AuthUser} from "../common/models/auth-user";
import {CardRepository} from "../models/cards/card.repository";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly cardRepository: CardRepository,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({email});
        if (!user) {
            throw new UnauthorizedException();
        }
        const correct = await bcrypt.compare(password, user.password);
        if (correct) {
            return user;
        }
        return null;
    }

    async register(email: string, password: string) {
        const userExist = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (userExist) {
            throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);
        }
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new UserEntity();
        user.email = email;
        user.password = passwordHash;

        await this.userRepository.save(user);
        return this.login(user);
    }

    login(user: UserEntity): AuthUser {
        const payload = {id: user.id, email: user.email};
        return {
            id: user.id,
            email: user.email,
            accessToken: this.jwtService.sign(payload),
        };
    }
}
