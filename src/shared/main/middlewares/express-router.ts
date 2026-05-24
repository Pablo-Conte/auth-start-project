import { RequestHandler } from 'express';

import { Controller } from '@/shared/application/general_controller';
import { SaveLogs } from '@/shared/application/save_logs';

type Middleware = (controller: Controller) => RequestHandler;

/**
 * @description Middleware function for Express.js that handles the execution of a controller and the sending of the HTTP response.
 * This function has been extended to handle responses with binary data and custom headers.
 *
 * @param controller The controller to be executed. The controller should have an `execute` method that takes a request object and returns a response object.
 *
 * The response object should have the following properties:
 * - statusCode: The HTTP status code for the response.
 * - data: The data to be returned in the response. This can be a binary buffer or any other type of data.
 * - headers: (Optional) Additional headers for the HTTP response. Useful for settings such as 'Content-Type' and 'Content-Disposition'.
 * - isBinary: (Optional) Indicates whether the response contains binary data. If true, the response will be sent as a binary stream.
 *
 * The request object is constructed from the Express.js request object, combining the body, params, query, headers, user context, and file context.
 *
 * @returns A middleware function that, when called with an Express.js request and response object, executes the controller and sends the response. The response object will have a status of 200 and may contain binary data and specific headers depending on the parameters provided by the controller.
 */
export const expressRouter: Middleware =
    (controller) => async (request, response) => {
        const { statusCode, data, headers, isBinary } =
            await controller.execute(request);

        SaveLogs.ExpressOutput(statusCode);

        if (isBinary) {
            Object.entries(headers as Record<string, string>).forEach(
                ([key, value]) => response.setHeader(key, value),
            );
            response.status(statusCode).send(data);
        } else {
            response.status(statusCode).json(data);
        }
    };
