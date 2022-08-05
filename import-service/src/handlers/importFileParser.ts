import { S3Event } from "aws-lambda";
import AWS from 'aws-sdk';
import csv from 'csv-parser';

import config from "config";
import logger from "utils/logger";
import {HttpCode} from "utils/http";
import {moveToParsedCatalog} from "utils/moveToParsedCatalog";

export const importFileParser = async (event: S3Event) => {
    const { REGION, BUCKET, SQS_URL } = config;
    const s3 = new AWS.S3({ region: REGION });
    const sqs = new AWS.SQS({ region: REGION })

    for (const record of event.Records) {
        const key = record.s3.object.key;
        logger.log(`Input file: `, key);

        const params = {
            Bucket: BUCKET,
            Key: key,
        }
        const s3Stream = s3.getObject(params).createReadStream();

        logger.log(`Start processing`);
        const csvStream = s3Stream.pipe(csv());
        for await (const data of csvStream) {
            logger.log('Sending item to SQS:', data)
            const result = await sqs.sendMessage({
                QueueUrl: SQS_URL,
                MessageBody: JSON.stringify(data),
            }).promise()
            logger.log('Result of sending to SQS:', result);
        }
        logger.log(`Finish processing`);

        await moveToParsedCatalog(s3, key)
    }

    return {
        statusCode: HttpCode.OK
    };
};
