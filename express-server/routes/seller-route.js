const router = require('express').Router();
const { sellerController } = require('../controllers');

router.get('/products/:id', sellerController.getProduct);
router.post('/products', sellerController.createProduct);
router.put('/products/:id', sellerController.editProduct);

module.exports = router;