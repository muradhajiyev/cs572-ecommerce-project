const
    path = require('path'),
    router = require('express').Router(),
    { buyerController } = require(path.join(__dirname, '..', 'controllers'));

router.get('/addresses', buyerController.getAllAddresses);
router.post('/addresses', buyerController.addAddress);
router.delete('/addresses/:id', buyerController.deleteAddress);
router.get('/addresses/:id', buyerController.getAddressDetail);
router.put('/addresses/:id', buyerController.editAddress);


module.exports = router;
