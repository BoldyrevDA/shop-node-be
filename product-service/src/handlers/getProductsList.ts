import {mockProductsController} from "helpers/MockProductsDataController";

export async function getProductsList(event) {
    return {
        statusCode: 200,
        body: JSON.stringify(
            mockProductsController.getAll()
        ),
    };
}
