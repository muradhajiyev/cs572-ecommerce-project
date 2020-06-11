var express = require('express');
const path = require('path');
const buyerController = require('../controllers/buyer');
var router = express.Router();

router.get('/addresses/:buyerId', buyerController.getAllAddresses);
router.post('/addresses/:buyerId', buyerController.addAddress);
router.post('/addresses/delete-address/:buyerId/:index', buyerController.deleteAddress);
router.get('/addresses/:buyerId/:index', buyerController.getAddressDetail);
router.put('/addresses/update', buyerController.editAddress);


module.exports = router;
