import {Product, ProductParams, Products} from "types/api-types";
import {db} from "db";
import {Client} from "pg";

interface Stock {
    productId: string,
    count: number,
}

export class ProductService {
    private insertProductQuery(client: Client, product: ProductParams) {
        const { title, description, price } = product;
        return client.query(
            'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id',
            [title, description, price]
        )
    }

    private insertStockQuery(client: Client, stock: Stock) {
        return client.query(
            'INSERT INTO stocks(product_id, count) VALUES($1, $2)',
            [stock.productId, stock.count],
        );
    }

    async createProduct(productParams: ProductParams) {
        const client = await db.getClient();
        let productId;
        try {
            await client.query('BEGIN')

            const insertProductRes = await this.insertProductQuery(client, productParams)
            productId = insertProductRes.rows[0].id;
            await this.insertStockQuery(client, {
                productId,
                count: productParams.count,
            });

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e;
        } finally {
            await client.end()
        }

        return { ...productParams, id: productId };
    }

    async createProducts(products: ProductParams[]) {
        const client = await db.getClient();
        let productId;
        try {
            await client.query('BEGIN')

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const insertProductRes = await this.insertProductQuery(client, product)
                await this.insertStockQuery(client, {
                    productId: insertProductRes.rows[0].id,
                    count: product.count,
                });
            }

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e;
        } finally {
            await client.end()
        }

        return;
    }

    async getById(id: string): Promise<Product> {
        const result = await db.query(
            `SELECT p.id, p.title, p.description, p.price, s.count
                  FROM products p
                  JOIN stocks s
                  ON p.id = s.product_id
                  WHERE p.id = $1`,
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
