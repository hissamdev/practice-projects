import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/product", productController.getProduct);
router.post("/products/create", productController.createProducts);
router.post("/products/tables/create", productController.productTable);

export default router;
