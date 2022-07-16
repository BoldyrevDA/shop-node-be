import {MockProductsDataController} from "helpers/MockProductsDataController";

describe("MockProductsDataController", () => {
    const productsListMock = [
        {
            "id": "1",
            "title": "product 1",
            "description": "desc",
            "price": 100,
            "count": 9
        },
        {
            "id": "2",
            "title": "product 2",
            "description": "desc",
            "price": 5,
            "count": 5
        }
    ]

    test("should return all list", async () => {
        const productsController = new MockProductsDataController(productsListMock);

        expect(productsController.getAll()).toEqual(productsListMock);
    });

    test("should return product by id", async () => {
        const productsController = new MockProductsDataController(productsListMock);

        expect(productsController.getById('1')).toEqual(productsListMock[0]);
    });
})
