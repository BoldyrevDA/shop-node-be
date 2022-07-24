import productsMock from 'mocks/products.json';
import {Product, Products} from "types/api-types";

export class MockProductsDataController {
    private data: Products;

    constructor(data = productsMock) {
        this.data = data;
    }

    getById(id: string) {
        return this.data.find((product: Product) => product.id === id)
    }

    getAll() {
        return this.data;
    }
}

export const mockProductsController = new MockProductsDataController();
