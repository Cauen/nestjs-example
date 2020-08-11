import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Error, CastError } from 'mongoose';

interface DatabaseErrorMessage {
  message: string;
  status: number;
  timestamp?: string;
  path?: string;
}

@Catch(Error)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly duplicateKey = 11000;
  private logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(typeof exception)
    console.log(exception)
    this.logErrorMessage(exception);

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getErrorMessage(exception)

    const errorMessage: DatabaseErrorMessage = {
      message: 'Problema no banco de dados: ' + message,
      status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(errorMessage.status).json(errorMessage);
  }

  private getErrorMessage(exception): String | Boolean {
    if (exception instanceof Error.CastError) return "problema com de tipo dos dados, verifique os campos"
    if (exception instanceof Error.ValidationError) return "problema com validação de dados, verifique os campos"
    return false
  }

  private logErrorMessage(exception) {
    let errorMessage = '';
    Reflect.ownKeys(exception).forEach(k => {
      errorMessage += `${String(k)}: ${exception[k]}/n`;
    });

    this.logger.log(errorMessage);
  }
}