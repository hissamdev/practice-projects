import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use("/api", userRoutes);

const port = 4000;
app.listen(port, () => {
    console.log("Express app listening on port:", port);
});
