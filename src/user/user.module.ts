import { /*MiddlewareConsumer,*/ Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(testMiddleware).forRoutes('users');
  // }
}
// function testMiddleware(req, res, next) {
//   console.log('This is middleware ^^');
//   next();
// }
