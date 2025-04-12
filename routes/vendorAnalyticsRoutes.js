const router = require('express').Router();
const { auth, authorize } = require('../middleware/authentMiddleware');
const ctrl = require('../controllers/vendorAnalyticsController');

router.use(auth, authorize('vendor'));

router.get('/daily-sales', ctrl.getDailySales);
router.get('/low-stock', ctrl.getLowStock);

module.exports = router;
