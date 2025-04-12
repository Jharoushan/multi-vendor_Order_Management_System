const placeOrder = require('../models/placeOrder');
const Product = require('../models/products');
const mongoose = require('mongoose');

exports.getRevenuePerVendor = async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const revenue = await Order.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    { $unwind: "$subOrders" },
    {
      $group: {
        _id: "$subOrders.vendorId",
        totalRevenue: { $sum: "$subOrders.total" }
      }
    }
  ]);

  res.json({ revenue });
};

exports.getTopProducts = async (req, res) => {
  const result = await placeOrder.aggregate([
    { $unwind: "$subOrders" },
    { $unwind: "$subOrders.items" },
    {
      $group: {
        _id: "$subOrders.items.productId",
        totalSold: { $sum: "$subOrders.items.quantity" }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $project: {
        name: "$product.name",
        totalSold: 1
      }
    }
  ]);

  res.json({ topProducts: result });
};

exports.getAverageOrderValue = async (req, res) => {
  const result = await placeOrder.aggregate([
    {
      $group: {
        _id: null,
        avgValue: { $avg: "$totalAmount" }
      }
    }
  ]);

  res.json({ averageOrderValue: result[0]?.avgValue || 0 });
};
