const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/inventorydb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// Routes
const productRoutes = require("./routes/productRoutes");

app.use("/api", productRoutes);



// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});