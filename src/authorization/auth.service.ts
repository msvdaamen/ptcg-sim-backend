import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {UserRepository} from "../models/users/user.repository";
import {UserEntity} from "../models/users/entities/user.entity";
import {AuthUser} from "../common/models/auth-user";
import {CardRepository} from "../models/cards/card.repository";
import {UserStatsRepository} from "../models/users/repositories/user-stats.repository";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly cardRepository: CardRepository,
        private readonly userStatsRepository: UserStatsRepository,
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
            const userStatsCount = await this.userStatsRepository.count({userId: user.id});
            if (userStatsCount === 0) {
                const stats = this.userStatsRepository.create({
                    userId: user.id
                });
                await this.userStatsRepository.save(stats);
            }
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
            ...user,
            // @ts-ignore
            password: undefined,
            accessToken: this.jwtService.sign(payload),
        };
    }
}
