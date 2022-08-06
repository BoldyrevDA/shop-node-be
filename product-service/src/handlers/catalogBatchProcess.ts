import AWS from 'aws-sdk';
import {SQSEvent} from "aws-lambda";
import {validateProductParams} from "utils/validators/product-validators";
import {productService} from "service/product";
import logger from "utils/logger";
import config from "config";

export const catalogBatchProcess = async (event: SQSEvent) => {
    const { REGION, SNS_ARN } = config;
    const sns = new AWS.SNS({ region: REGION });
    logger.log('Event: ', event);
    const products = event.Records.map(record => record.body);

    for (let i = 0; i < products.length; i++) {
        const product = JSON.parse(products[i]);

        logger.log('Processing product', product);
        const validateError = validateProductParams(product);

        if (validateError) {
            throw new Error(validateError);
        }

        await productService.createProduct(product);
    }

    logger.log('Publishing to SNS', SNS_ARN);
    await sns.publish({
        Subject: 'New products in DB',
        Message: JSON.stringify(products),
        TopicArn: SNS_ARN,
    }).promise();

    return;
}
