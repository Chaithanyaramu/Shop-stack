const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);

const PORT = process.removeListener.PORT || 5000;
app.listen(PORT,() => console.log((`server is running on port ${PORT} `)));

