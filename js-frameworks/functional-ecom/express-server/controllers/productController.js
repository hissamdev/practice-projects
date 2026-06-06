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
                id SERIAL PRIMARY KEY,
                
            )
        `);
};

export default { createProducts };
