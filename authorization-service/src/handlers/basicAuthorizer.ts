import {APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult} from "aws-lambda";

export const basicAuthorizer = async (event: APIGatewayAuthorizerEvent, ctx, callback) => {
    console.log('start', event);
    // if (event.type !== 'REQUEST') {
    //     callback('Unauthorized');
    // }

    try {
        // @ts-ignore - identitySource exists in event
        const { identitySource, routeArn } = event;
        const authorizationToken = identitySource[0];

        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const [username, password] = plainCreds;
        console.log('username', username);
        console.log('pass', password);
        const storedUserPassword = process.env[username];
        const effect = storedUserPassword === password
            ? 'Allow'
            : 'Deny'

        return generatePolicy(encodedCreds, effect, routeArn);
    } catch (e) {
        return callback(`Unathorized ${e.message}`);
    }
}

const generatePolicy = (
    principalId: string,
    effect: 'Allow' | 'Deny',
    resource: string,
): APIGatewayAuthorizerResult => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Effect: effect,
                Action: 'execute-api:Invoke',
                Resource: resource,
            }]
        }
    };
}
