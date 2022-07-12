import { Context, APIGatewayEvent } from 'aws-lambda';
import { Product } from "types/product";
import products from 'mocks/products.json';

export async function getProductById(event: APIGatewayEvent, context: Context) {
    const { productId } = event.pathParameters;
    const product = products.find((product) => product.id === productId)
    const response = product === undefined ? null : product;

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
}
