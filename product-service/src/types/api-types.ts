export interface Product {
    id: string;
    title: string;
    description?: string;
    price?: number;
    count: number;
}

export type Products = Product[];

export interface ProductParams { // = Omit<Product, "id">, but auto-swagger doesn't understand
    title: string;
    description?: string;
    price?: number;
    count: number;
}

export interface ErrorApiResponse {
    message: string;
}
