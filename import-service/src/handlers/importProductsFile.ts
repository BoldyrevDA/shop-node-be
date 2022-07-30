import AWS from 'aws-sdk';
import { APIGatewayEvent } from "aws-lambda";
import {lambdaHandler} from "utils/lamdaHandler";
import {HttpCode, HttpError} from "product-service/src/utils/http";
import {validateFileName} from "utils/validators/upload-validators";

const region = 'eu-west-1';
const BUCKET = 'shop-files-bucket';
const catalog = 'uploaded'

export const importProductsFile = lambdaHandler(async (event: APIGatewayEvent) => {
    const s3 = new AWS.S3({ region })
    const fileName = event.queryStringParameters?.name;

    const validateError = validateFileName(fileName);
    if (validateError) {
        throw new HttpError(
            HttpCode.BAD_REQUEST,
            validateError
        );
    }

    const params = {
        Bucket: BUCKET,
        Key: `${catalog}/${fileName}`,
        Expires: 60,
        ContentType: 'text/csv',
    }

    return s3.getSignedUrl('putObject', params);
})
