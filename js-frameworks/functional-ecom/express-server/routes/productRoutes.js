import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router.post("/products/create", productController.createProducts);

export default router;
