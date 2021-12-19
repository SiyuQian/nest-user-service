import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
