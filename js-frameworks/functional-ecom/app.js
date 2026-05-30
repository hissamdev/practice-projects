import express from "express";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use("/", productRoutes);

const port = 4000;
app.listen(port, () => {
    console.log("Express app listening on port:", port);
});
