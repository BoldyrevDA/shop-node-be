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

    async getList(): Promise<Products> {
        const result = await db.query(
            `SELECT p.id, p.title, p.description, p.price, s.count
                  FROM products p
                  JOIN stocks s
                  ON p.id = s.product_id
                 `,
            );
        return result.rows;
    }
}

export const productService = new ProductService();
