const mongoose = require('mongoose');
const Order = require('../models/placeOrder');
const Product = require('../models/products');
const Joi = require('joi');

const orderSchema = Joi.object({
  items: Joi.array().items(Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required()
  })).min(1).required()
});

exports.placeOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const items = req.body.items;
    const productMap = {};
    let totalAmount = 0;

    for (let item of items) {
      const product = await products.findById(item.productId).session(session);
      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productId}`);
      }

      product.stock -= item.quantity;
      await product.save({ session });

      const vendorId = product.vendorId.toString();
      if (!productMap[vendorId]) {
        productMap[vendorId] = { vendorId, items: [], total: 0 };
      }

      const lineTotal = product.price * item.quantity;
      productMap[vendorId].items.push({
        productId: product._id,
        quantity: item.quantity
      });
      productMap[vendorId].total += lineTotal;
      totalAmount += lineTotal;
    }

    const subOrders = Object.values(productMap);
    const masterOrder = new Order({
      customerId: req.user._id,
      subOrders,
      totalAmount
    });

    await masterOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ order: masterOrder });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Order error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
