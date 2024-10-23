import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import BusinessModules from './modules/index.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ...BusinessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
