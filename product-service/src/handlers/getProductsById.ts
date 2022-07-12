import { Context, APIGatewayEvent } from 'aws-lambda';
import { Product } from "types/product";
import products from 'mocks/products.json';

export async function getProductById(event: APIGatewayEvent, context: Context) {
    const { productId } = event.pathParameters;
    const product = products.find((product: Product) => product.id === productId);

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
