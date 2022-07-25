import { APIGatewayEvent } from 'aws-lambda';
import {lambdaHandler} from "utils/lamdaHandler";
import {productService} from "service/product";
import {HttpCode, HttpError} from "utils/http";
import {validateProductParams} from "utils/validators/product-validators";

export const createProduct = lambdaHandler(async (event: APIGatewayEvent) => {
    const data = JSON.parse(event.body);
    const validateError = validateProductParams(data);

    if (validateError) {
        throw new HttpError(
            HttpCode.BAD_REQUEST,
            validateError
        );
    }

    return productService.createProduct(data);
})
