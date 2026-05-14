import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use("/api", userRoutes);

app.listen(3100, () => {
    console.log("App running on port ", 3100);
});
