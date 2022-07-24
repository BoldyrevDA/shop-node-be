import {mockProductsController} from "utils/MockProductsDataController";
import {db} from "db";
import {lambdaHandler} from "utils/lamdaHandler";
import {productService} from "service/product";

export const getProductsList = lambdaHandler(async (event) => {
    return await productService.getAll();
})
