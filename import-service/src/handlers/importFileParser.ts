import { S3Event } from "aws-lambda";
import AWS from 'aws-sdk';
import csv from 'csv-parser';

import config from "config";
import logger from "utils/logger";
import {HttpCode} from "utils/http";
import {moveToParsedCatalog} from "utils/moveToParsedCatalog";

export const importFileParser = async (event: S3Event) => {
    const { REGION, BUCKET } = config;
    const s3 = new AWS.S3({ region: REGION })

    for (const record of event.Records) {
        const key = record.s3.object.key;
        logger.log(`Input file: `, key);

        const params = {
            Bucket: BUCKET,
            Key: key,
        }
        const s3Stream = s3.getObject(params).createReadStream();

        logger.log(`Start parsing`);
        const results = [];
        const csvStream = s3Stream.pipe(csv());
        for await (const data of csvStream) {
            results.push(data);
        }
        logger.log(`Finish parsing. Result data: `, results)

        await moveToParsedCatalog(s3, key)
    }

    return {
        statusCode: HttpCode.OK
    };
};
