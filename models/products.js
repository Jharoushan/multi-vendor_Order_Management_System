const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'userLoginSignup', required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }         //comes from using {timestamps:true} in userLoginSignup
});

module.exports = model('products', productSchema);
