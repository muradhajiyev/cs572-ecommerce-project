const router = require('express').Router();
const { productController } = require('../controllers');
const Role = require('../models/enums/user-role');
const authorize = require('../_helpers/authorize');

router.get('/', productController.getProducts);
router.get('/seller/:id', productController.getProductsBySellerId);
router.get('/:id', productController.getProduct);
router.post('/', authorize(Role.SELLER), productController.createProduct);
router.put('/:id',  authorize(Role.SELLER), productController.editProduct);

//Todo: it is needed to be implemented after product id is added to orders.
router.delete('/:id',  authorize(Role.SELLER), productController.deleteProduct);
router.get('/images/:name', productController.getImage);

module.exports = router;