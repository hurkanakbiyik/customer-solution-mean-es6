module.exports = function(options) {
    return function(req, res, next) {
        // TODO auth control for current db type
        if (true){
            return next();
        }
        else{
            //TODO
            return next();
            /*
            res.status(401);
            return res.send({
                status : 401,
                message : 'Unautharized user'
            })
            */
        }
    }
};