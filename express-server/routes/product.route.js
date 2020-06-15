const router = require('express').Router();
const { productController } = require('../controllers');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

//todo: get all products by filter (category, etc.s), delete if it is not  bought
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authorize(Role.SELLER), productController.createProduct);
router.put('/:id',  authorize(Role.SELLER), productController.editProduct);

module.exports = router;