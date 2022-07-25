import {Product, ProductParams, Products} from "types/api-types";
import {db} from "db";

export class ProductService {
    async createProduct(productParams: ProductParams) {
        const client = await db.getClient();
        const { title, description, price, count } = productParams;
        let productId;
        try {
            await client.query('BEGIN')

            // insert product
            const insertProductRes = await client.query(
                'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id',
                [title, description, price]
            )
            productId = insertProductRes.rows[0].id;

            // insert stock
            await client.query(
                'INSERT INTO stocks(product_id, count) VALUES($1, $2)',
                [productId, count],
            );

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e;
        } finally {
            await client.end()
        }

        return { ...productParams, id: productId };
    }

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
