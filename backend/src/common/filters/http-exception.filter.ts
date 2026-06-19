import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
    const response =
        exception.getResponse();

    message =
        typeof response === 'string'
        ? response
        : (response as any).message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}