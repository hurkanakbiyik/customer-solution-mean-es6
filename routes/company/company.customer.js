let express = require('express');
let router = express.Router();

let CustomerService = require('../../databases/mongo/services/company/Customer.service');

router.post('/find', function (req, res, next) {
    CustomerService.find(req.body.data,next);
});

router.post('/findByFilter', function (req, res, next) {
    CustomerService.findByFilter(req.body.data,next);
});

router.post('/create', function (req, res, next) {
    CustomerService.create(req.body.data,next);
});

router.post('/findItemCount', function (req, res, next) {
    CustomerService.findItemCount(req.body.data,next);
});

router.post('/bulkCreate', function (req, res, next) {
    CustomerService.bulkCreate(req.body.data,next);
});

router.post('/bulkDelete', function (req, res, next) {
    CustomerService.bulkDelete(req.body.data,next);
});

router.post('/findOne', function (req, res, next) {
    CustomerService.findOne(req.body.data,next);
});

router.post('/update', function (req, res, next) {
    CustomerService.update(req.body.data,next);
});

router.post('/remove', function (req, res, next) {
    CustomerService.remove(req.body.data,next);
});


module.exports = router;
