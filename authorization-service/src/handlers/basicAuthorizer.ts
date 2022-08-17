import {APIGatewayAuthorizerEvent} from "aws-lambda";

export const basicAuthorizer = async (event: APIGatewayAuthorizerEvent) => {
    console.log('start', event);
    if (event.type !== 'REQUEST') {
        console.log('event.type', event.type);
        return { isAuthorized: false };
    }

    try {
        // @ts-ignore - identitySource exists in event
        const { identitySource } = event;
        const authorizationToken = identitySource[0];

        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');

        const [username, password] = plainCreds;
        const isAuthorized = !!process.env[username] && process.env[username] === password;
        console.log(`for ${username} isAuthorized = ${isAuthorized}`);
        return { isAuthorized };
    } catch (e) {
        console.error(e);
        return { isAuthorized: false };
    }
}
