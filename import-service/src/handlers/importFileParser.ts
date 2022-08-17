import { S3Event } from "aws-lambda";
import AWS from 'aws-sdk';
import csv from 'csv-parser';

import config from "config";
import logger from "utils/logger";
import {HttpCode} from "utils/http";
import {moveToParsedCatalog} from "utils/moveToParsedCatalog";
import {SQSProvider} from "utils/providers/sqsProvider";

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
        const batchSize = 10;
        const sqsProvider = new SQSProvider(sqs, SQS_URL, batchSize);
        let rows = [];

        for await (const data of csvStream) {
            logger.log('Item to SQS:', data)
            rows.push(data);
            if (rows.length >= batchSize) {
                await sqsProvider.sendMessages(rows)
                rows = [];
            }
        }
        if (rows.length) {
            await sqsProvider.sendMessages(rows)
        }
        logger.log(`Finish processing`);

        await moveToParsedCatalog(s3, key)
    }

    return {
        statusCode: HttpCode.OK
    };
};
