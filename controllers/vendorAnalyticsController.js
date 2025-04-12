const Order = require('../models/placeOrder');
const Product = require('../models/products');

exports.getDailySales = async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const sales = await placeOrder.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    { $unwind: "$subOrders" },
    { $match: { "subOrders.vendorId": req.user._id } },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        },
        total: { $sum: "$subOrders.total" }
      }
    },
    { $sort: { "_id.day": 1 } }
  ]);

  res.json({ dailySales: sales });
};

exports.getLowStock = async (req, res) => {
  const lowStockItems = await Product.find({
    vendorId: req.user._id,
    stock: { $lt: 5 }
  }).select('name stock');

  res.json({ lowStock: lowStockItems });
};
