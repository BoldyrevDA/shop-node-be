import { APIGatewayEvent } from 'aws-lambda';
import {lambdaHandler} from "utils/lamdaHandler";
import {productService} from "service/product";
import {HttpCode, HttpError} from "utils/http";

export const getProductById = lambdaHandler(async (event: APIGatewayEvent) => {
    const { productId } = event.pathParameters;
    const product = await productService.getById(productId);

    if (product === undefined) {
        throw new HttpError(
            HttpCode.NOT_FOUND,
            `Product with id: ${productId} was not found`
        );
    }

    return product;
})
