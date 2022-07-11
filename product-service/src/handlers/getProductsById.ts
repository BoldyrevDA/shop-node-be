import products from 'mocks/products.json';

export async function getProductById(event) {
    const { productId } = event.pathParameters;
    const product = products.find((product) => product.id === productId)
    const response = product === undefined ? null : product;

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
}
