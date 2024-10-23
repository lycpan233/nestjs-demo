import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { PrismaQueryHelperService } from './query-helper.service';

@Injectable()
export class PrismaClientProvider
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly queryHelper: PrismaQueryHelperService) {
    super({
      log: ['query'],
    });
  }

  withExtensions() {
    this.$on('query', (event: Prisma.QueryEvent) => {
      let queryMsg = event.query;
      const params = JSON.parse(event.params) as string[];
      for (const k of params) {
        queryMsg = queryMsg.replace('?', ` ${k} `);
      }
      queryMsg += ';';
      console.log(`======sql_log=====\n${queryMsg} ${event.duration}ms`, event);
    });
    return this.$extends(this.queryHelper.existsExtension);
  }

  onModuleInit() {
    return this.$connect();
  }

  onModuleDestroy() {
    return this.onModuleInit();
  }
}
