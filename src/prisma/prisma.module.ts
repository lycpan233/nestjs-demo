import { Global, Module } from '@nestjs/common';

import { PrismaClientProvider } from './client.provider';
import { PrismaService } from './prisma.service';
import { PrismaQueryHelperService } from './query-helper.service';

@Global()
@Module({
  providers: [PrismaQueryHelperService, PrismaClientProvider, PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
