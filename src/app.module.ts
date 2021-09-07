import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';;
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
    ]),
  ],
  providers: [],
  exports: [],
})

export class AppModule {}
