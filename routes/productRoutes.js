const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { auth, authorize } = require('../middleware/authentMiddleware');

router.use(auth, authorize('vendor'));

router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.get('/my', productsController.getVendorProducts);

module.exports = router;
