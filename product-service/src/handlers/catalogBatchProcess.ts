import AWS from 'aws-sdk';
import {SQSEvent} from "aws-lambda";
import {validateProductParams} from "utils/validators/product-validators";
import {productService} from "service/product";
import logger from "utils/logger";

export const catalogBatchProcess = async (event: SQSEvent) => {
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
}
