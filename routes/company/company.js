let express = require('express');
let router = express.Router();

router.use('/customer', require('./company.customer'));

module.exports = router;
