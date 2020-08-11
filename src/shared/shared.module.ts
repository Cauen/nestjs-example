import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { DatabaseExceptionFilter } from './exceptions';
import { RestLoggerMiddleware } from './middlewares';

@Module({
  controllers: [],
  exports: [
    DatabaseExceptionFilter,
    RestLoggerMiddleware,
  ],
})
export class SharedModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
