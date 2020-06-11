const
    path = require('path'),
    router = require('express').Router(),
    { buyerController } = require(path.join(__dirname, '..', 'controllers'));

router.get('/addresses', buyerController.allAddresses);
router.post('/addresses', buyerController.addAddress);
router.put('/addresses/:id', buyerController.updateAddress);
router.get('/addresses/:id', buyerController.getAddress);
router.delete('/addresses/:id', buyerController.deleteAddress);



module.exports = router;