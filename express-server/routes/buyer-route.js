const
    path = require('path'),
    router = require('express').Router(),
    { buyerController } = require(path.join(__dirname, '..', 'controllers'));

router.get('/addresses', buyerController.getAllAddresses);
router.post('/addresses', buyerController.addAddress);
router.delete('/addresses/:id', buyerController.deleteAddress);
router.get('/addresses/:id', buyerController.getAddressDetail);
router.put('/addresses/:id', buyerController.editAddress);

router.get('/billing-info', buyerController.getAllBillingInfo);
router.post('/billing-info', buyerController.addBillingInfo);
router.delete('/billing-info/:id', buyerController.deleteBillingInfo);
router.get('/billing-info/:id', buyerController.getBillingInfoDetail);
router.put('/billing-info/:id', buyerController.editBillingInfo);

router.post('/follow-seller', buyerController.addFollowSeller);
router.delete('/follow-seller/:id', buyerController.deleteFollowSeller);

router.get('/reviews/:productId', buyerController.getAllActiveReviewsByProductId);
router.post('/add-review/:orderId/:productId', buyerController.addReview);
router.delete('/delete-review/:productId/:reviewId', buyerController.deleteReview);

router.post('/checkout', buyerController.createOrder);
router.post('/order/:orderId/cancel', buyerController.cancelOrder);


module.exports = router;
