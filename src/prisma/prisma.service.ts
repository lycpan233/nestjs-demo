import { Injectable, Type } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { PrismaClientProvider } from './client.provider';

const buildPrismaService = () => {
  return class {
    constructor(provider: PrismaClientProvider) {
      return provider.withExtensions();
    }
  } as Type<PrismaClient & ReturnType<PrismaClientProvider['withExtensions']>>;
};

@Injectable()
export class PrismaService extends buildPrismaService() {
  constructor(provider: PrismaClientProvider) {
    super(provider);
  }
}
