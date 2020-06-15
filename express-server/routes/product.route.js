const router = require('express').Router();
const { productController } = require('../controllers');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.get('/products/:id', authorize(), productController.getProduct);
router.post('/products', authorize(Role.SELLER), productController.createProduct);
router.put('/products/:id',  authorize(Role.SELLER), productController.editProduct);

module.exports = router;