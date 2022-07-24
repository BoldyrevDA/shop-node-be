import {Product, Products} from "types/api-types";
import {db} from "db";

export class ProductService {
    async getById(id: string): Promise<Product> {
        const result = await db.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );
        return result.rows?.[0];
    }

    async getAll(): Promise<Products> {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    }
}

export const productService = new ProductService();
