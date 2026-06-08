import { pool } from "../db/index.js";

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', pi.id,
                            'image_url', pi.image_url,
                            'image_alt', pi.image_alt,
                            'is_primary', pi.is_primary,
                            'position', pi.position
                        )
                        ORDER BY pi.position ASC
                    ) FILTER (WHERE pi.id IS NOT NULL),
                    '[]'
                ) AS images
            FROM products p
            LEFT JOIN product_images pi
                ON p.id = pi.product_id
            GROUP BY p.id;
            `);

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all products",
            data: result.rows,
        });
    } catch (e) {
        console.error("Something went wrong:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all products",
            error: e,
        });
    }
};

const getProduct = async (req, res) => {
    // req.body.slug
    const slug = req.body.slug;
    try {
        const result = await pool.query(`
                SELECT * FROM products WHERE url = ${slug};
            `);
        return res.json({
            success: true,
            message: "Successfully fetched product",
            data: result.rows[0],
        });
    } catch (e) {
        console.error("Something went wrong:", e);
        return res.status(500).json({
            message: "Something went wrong",
            error: e,
        });
    }
};

const createProducts = async (req, res) => {
    const body = req.body;
    const client = await pool.connect();
    try {
        await client.query("BEGIN;");
        for (const product of body) {
            const result = await client.query(
                `
                    INSERT INTO products (heading, description, price, url, content)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id;`,
                [
                    product.heading,
                    product.description,
                    product.price,
                    product.url,
                    product.content,
                ],
            );
            console.log("Product insertion successful:", result.rows[0]?.id);
            for (const image of product.images) {
                await client.query(
                    `
                        INSERT INTO product_images (product_id, image_url, image_alt, is_primary)
                        VALUES ($1, $2, $3, $4);`,
                    [result.rows[0]?.id, image.url, image.alt, image.isPrimary],
                );
            }
        }
        await client.query("COMMIT;");
        return res.json({
            success: true,
            message: "Product created successfully",
            data: body,
        });
    } catch (e) {
        await client.query("ROLLBACK;");
        console.error("Failed to create dummy products:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to create table",
            error: e,
        });
    } finally {
        client.release();
    }
};

const productTable = async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                heading TEXT UNIQUE NOT NULL,
                description TEXT,
                price NUMERIC NOT NULL,
                content TEXT,
                url TEXT NOT NULL,
                featured_product BOOLEAN DEFAULT FALSE NOT NULL,
                best_seller BOOLEAN DEFAULT FALSE NOT NULL
            );

            CREATE TABLE IF NOT EXISTS product_images (
                id SERIAL PRIMARY KEY,
                product_id UUID REFERENCES products(id) ON DELETE CASCADE,
                image_url TEXT NOT NULL,
                image_alt TEXT NOT NULL,
                is_primary BOOLEAN DEFAULT FALSE NOT NULL,
                position NUMERIC
            );

            CREATE TABLE IF NOT EXISTS product_specs (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                value TEXT NOT NULL
            );
        `);

        return res
            .status(201)
            .json({ success: true, message: "Tables created successfully" });
    } catch (e) {
        console.error("Error creating tables:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to create tables",
            error: e,
        });
    }
};

export default { getAllProducts, getProduct, createProducts, productTable };
