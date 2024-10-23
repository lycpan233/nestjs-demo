import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaQueryHelperService {
  existsExtension = Prisma.defineExtension({
    name: 'user-filed-rolesArr',
    result: {
      user: {
        rolesArr: {
          needs: { roles: true, id: true },
          compute(user) {
            return user.roles.split('|').filter(item => item !== '');
          },
        },
      },
    },
  });
}
