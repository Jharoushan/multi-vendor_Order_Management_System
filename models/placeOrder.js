const { Schema, model, Types } = require('mongoose');

const subOrderSchema = new Schema({
  vendorId: { type: Types.ObjectId, ref: 'userLoginSignup', required: true },
  items: [{
    productId: { type: Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true }
}, { _id: false });

const orderSchema = new Schema({
  customerId: { type: Types.ObjectId, ref: 'userLoginSignup', required: true },
  subOrders: [subOrderSchema],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('placeOrder', orderSchema);

