const products = require('../models/products');
const Joi = require('joi');


const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().optional()
});

// Create product
exports.createProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const product = new products({ ...req.body, vendorId: req.user._id });
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    console.error('Create product failed:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await products.findOneAndUpdate(
      { _id: id, vendorId: req.user._id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await products.findOneAndDelete({
      _id: req.params.id,
      vendorId: req.user._id
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// fetch all products by current vendor
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await products.find({ vendorId: req.user._id });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
