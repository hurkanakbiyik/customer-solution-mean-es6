var config = require('../../config');
var logger = require('../../logger');
var mongoose = require('mongoose');
var url = config.database.mongo.url + config.database.mongo.db;
mongoose.connect(url,{}, function (error) {
    if (error) {
        logger.error("Mongo ERROR on " , {mongo : config.database.mongo});
        logger.error('Please install and run mongodb.');
    } else {
        logger.info("Mongo Connected to " ,{mongo : config.database.mongo} );
    }
});

module.exports = mongoose;