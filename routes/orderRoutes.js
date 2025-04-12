const router = require('express').Router();
const { auth, authorize } = require('../middleware/authentMiddleware');
const { placeOrder } = require('../controllers/orderController');

router.post('/', auth, authorize('customer'), placeOrder);

module.exports = router;
