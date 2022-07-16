import { Context, APIGatewayEvent } from 'aws-lambda';
import {mockProductsController} from "helpers/MockProductsDataController";

export async function getProductById(event: APIGatewayEvent, context: Context) {
    const { productId } = event.pathParameters;

    const product = mockProductsController.getById(productId);

    if (product === undefined) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Product not found" })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(product)
    };
}
