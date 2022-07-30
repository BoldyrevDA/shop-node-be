import {
    APIGatewayEvent,
} from 'aws-lambda';

import logger from 'utils/logger';
import { HttpCode } from "utils/http";

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

/* Helper to handle base lambda logic */
export const lambdaHandler = (controllerCallback: (event: APIGatewayEvent) => Promise<any>) =>
    async (event: APIGatewayEvent) => {
        const { body, pathParameters, queryStringParameters } = event;
        let statusCode: HttpCode;
        let result: any;

        try {
            logger.log('Request ==>', { pathParameters, queryStringParameters, body });

            result = await controllerCallback(event);
            statusCode = HttpCode.OK;

            logger.log(`Response <== [${statusCode}]`, body);
        } catch (err) {
            result = { message: err.message };
            statusCode = err.statusCode || HttpCode.SERVER_ERROR;

            logger.error(
                `Error <== [${statusCode}] `,
                err.message,
                statusCode < HttpCode.SERVER_ERROR ? undefined : err.stack,
            );
        }

        return {
            statusCode,
            headers: CORS_HEADERS,
            body: JSON.stringify(result),
        };
    }
