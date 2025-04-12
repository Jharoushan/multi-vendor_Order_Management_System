const router = require('express').Router();
const { auth, authorize } = require('../middleware/authentMiddleware');
const ctrl = require('../controllers/adminAnalyticsController');

router.use(auth, authorize('admin'));

router.get('/revenue', ctrl.getRevenuePerVendor);
router.get('/top-products', ctrl.getTopProducts);
router.get('/avg-order-value', ctrl.getAverageOrderValue);

module.exports = router;
