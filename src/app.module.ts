import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import FirstMiddleware from './middleware/first.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//   MongooseModule.forRoot('mongodb+srv://david:JztwQnpteUVDDJnl@cluster0.qynhvz2.mongodb.net/'),
//   UsersModule,
//   ProductsModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [
 ConfigModule.forRoot(),
 MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URL'),
  })
 }),
  UsersModule,
  ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes('*');
}
}