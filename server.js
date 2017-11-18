const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const auth = require('./security/auth');

process.on('uncaughtException',function (error) {
    logger.error(error);
});

/** RUN */
const app = express();
const http = require('http').Server(app);

/** socket run
 *  very good for use websockets. I did not create any example for this.
 *
 */
const io = require('socket.io')(http);
io.on('connection',function (client) {

    console.log("Client connection is ON!");

});

/** mongo init */
require("./databases/mongo/mongo-connect");

/**
 * CORS Handle
 * For client actions i need to define CORS.
 */
app.all('*',function(req,res,next)
{
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    if ('OPTIONS'.toLocaleLowerCase() === req.method.toLocaleLowerCase()) return res.sendStatus(200);
    next();
});

/**
 * Express.js need to use bodyparser for convert application/json data form.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static(__dirname + '/dist'));

/**
 * AUTH CONTROL
 */
app.use(auth({}));

/**
 * ROUTES
 */
app.get('/*', function(req, res){
    res.sendStatus(200);
});

let companyRoute = require('./routes/company/company');
app.use('/company', companyRoute);

/**
 * ERROR HANDLING
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let result = {
        error : new Error(req.originalUrl + " not found." ),
        status : 500
    };
    next(result);
});

/**
 * RESULT FOR SERVICES
 */
app.use(function(result, req, res, next) {
    if(result.error){
        res.status(500).send({
            status:500,
            message: result.error.message || 'server error',
            result : result.error,
            type:'internal'
        });
    }else{
        res.status(200);
        res.send(result);
    }

});

/**
 * START
 */

http.listen(config.port,function (error) {
    if(error) logger.error(error);
    logger.info("Server running on http://localhost:" + config.port);
});
