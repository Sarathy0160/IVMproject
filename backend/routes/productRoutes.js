const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const History = require("../models/History");

// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD PRODUCT
router.post("/products", async (req, res) => {
  try {
    console.log(req.body);

    const product = new Product(req.body);

    await product.save();

    await History.create({
  productName: product.productName,
  action: "ADD",
  details:
    `Brand: ${product.brand}\n` +
    `Category: ${product.category}\n` +
    `Quantity: ${product.quantity}\n` +
    `Price: ${product.price}`
});
    res.status(201).json(product);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
});

// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

   await History.create({
  productName: product.productName,
  action: "DELETE",
  details:
    `Brand: ${product.brand}\n` +
    `Category: ${product.category}\n` +
    `Quantity: ${product.quantity}\n` +
    `Price: ${product.price}`
});

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// UPDATE PRODUCT
router.put("/products/:id", async (req, res) => {
  try {

    const oldProduct = await Product.findById(req.params.id);

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let details = "";

    if (oldProduct.productName !== updated.productName) {
      details += `Product Name: ${oldProduct.productName} → ${updated.productName}\n`;
    }

    if (oldProduct.category !== updated.category) {
      details += `Category: ${oldProduct.category} → ${updated.category}\n`;
    }
    if (oldProduct.brand !== updated.brand) {
  details += `Brand: ${oldProduct.brand} → ${updated.brand}\n`;
}

    if (oldProduct.quantity != updated.quantity) {
      details += `Quantity: ${oldProduct.quantity} → ${updated.quantity}\n`;
    }

    if (oldProduct.price != updated.price) {
      details += `Price: ${oldProduct.price} → ${updated.price}\n`;
    }

    console.log(details);

    await History.create({
      productName: updated.productName,
      action: "UPDATE",
      details: details || "No changes"
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});// GET HISTORY
router.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({
      date: -1
    });

    res.json(history);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;