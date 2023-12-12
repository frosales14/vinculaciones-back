import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VinculacionModule } from './vinculacion/vinculacion.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    VinculacionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
