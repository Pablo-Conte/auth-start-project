import { HttpResponse } from './http_responses';
import { Request } from 'express';

export abstract class Controller {
    abstract handle(httpRequest: Request): Promise<HttpResponse>;

    async execute(httpRequest: Request): Promise<HttpResponse> {
        return await this.handle(httpRequest);
    }
}
