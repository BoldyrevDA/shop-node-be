import products from 'mocks/products.json';

export async function getProductsList(event) {
    return {
        statusCode: 200,
        body: JSON.stringify(
            products
        ),
    };
}
