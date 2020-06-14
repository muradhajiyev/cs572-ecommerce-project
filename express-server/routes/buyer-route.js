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
router.post('/order/:orderId/product/:productId/add-review', buyerController.addReview);
router.delete('/delete-review/:productId/:reviewId', buyerController.deleteReview);

module.exports = router;
