import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { format } from 'date-fns';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Your request failed. Try again later";

        if (exception instanceof BadRequestException) {
            status = exception.getStatus();
            const response = exception.getResponse();

            message = Array.isArray(response['message'])
                ? response['message'][0]
                : response['message'];
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        }

        console.error(exception);

        const sendBack = {
            error: message,
            statusCode: status,
            timestamp: format(new Date(), "Ppp"),
        };

        httpAdapter.reply(ctx.getResponse(), sendBack, status);
    }
}
