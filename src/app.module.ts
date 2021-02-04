import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {join} from 'path';
import {ConfigModule} from "@nestjs/config";
import {MysqlDatabaseProviderModule} from "./providers/database/mysql/mysql-database-provider.module";
import {AppResolver} from "./app.resolver";
import {AuthModule} from "./authorization/auth.module";
import {UsersModule} from "./models/users/users.module";
import {CardsModule} from "./models/cards/cards.module";
import {ImagesModule} from "./models/images/images.module";
import {RaritiesModule} from "./models/rarities/rarities.module";
import {CardTypesModule} from "./models/card-types/card-types.module";
import {PokemonTypesModule} from "./models/pokemon-types/pokemon-types.module";
import {PackOpeningModule} from "./models/pack-opening/pack-opening.module";
import {ExchangeModule} from "./models/exchange/exchange.module";
import {CqrsModule} from "@nestjs/cqrs";
import {PubSub} from "graphql-subscriptions";
import {PubSubModule} from "./providers/pub-sub/pub-sub.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./common/constants/jwt.constants";
import {PacksModule} from "./models/packs/packs.module";


@Module({
  imports: [
    MysqlDatabaseProviderModule,
    GraphQLModule.forRootAsync({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '8h' },
        })
      ],
      useFactory: async (jwtService: JwtService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts')
        },
        context: ({ req, connection }) => ({ req, connection }),
        uploads: {
          maxFileSize: 10000000, // 10 MB
          maxFiles: 5,
        },
        installSubscriptionHandlers: true,
        subscriptions: {
          onConnect: connectionParams => {
            const authToken: string = ('authorization' in connectionParams)&& (connectionParams['authorization'] as string).split(' ')[1];
            if (authToken) {
              const payload = jwtService.decode(authToken);
              return {currentUser: payload, headers: connectionParams}
            }
            throw new Error('authToken must be provided');
          }
        }
      }),
      inject: [JwtService]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CqrsModule,
    AuthModule,
    UsersModule,
    CardsModule,
    ImagesModule,
    RaritiesModule,
    CardTypesModule,
    PokemonTypesModule,
    PackOpeningModule,
    ExchangeModule,
    PubSubModule,
    PacksModule
  ],
  providers: [
    AppService,
    AppResolver

  ],
})
export class AppModule {}
