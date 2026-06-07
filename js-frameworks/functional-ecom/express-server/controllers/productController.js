import { pool } from "../db";

const createProducts = async (req, res) => {
    try {
        await Promise.all(
            req.map((product) => {
                pool.query(`
                        INSERT INTO products ()
                    `);
            }),
        );
    } catch (e) {
        console.error("Failed to create dummy products:", e);
    }
};

const productTable = async (req, res) => {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                heading TEXT NOT NULL,
                description TEXT,
                price INTEGER NOT NULL,
                content TEXT,
                url TEXT NOT NULL,
                image_url JSONB NOT NULL,
                image_alt TEXT NOT NULL,
                featured_product BOOLEAN DEFAULT FALSE NOT NULL,
                best_seller BOOLEAN DEFAULT FALSE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS product_specs (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                value TEXT NOT NULL
            );
        `);
};

export default { createProducts };
