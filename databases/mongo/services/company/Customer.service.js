let Customer = require('../../models/company/Customer');
let service = {
    find : find,
    findByFilter : findByFilter,
    findItemCount : findItemCount,
    findOne : findOne,
    create : create,
    bulkCreate : bulkCreate,
    bulkDelete : bulkDelete,
    update  : update,
    remove : remove
};

/**
 *
 * @param data
 * @param callback
 */
function find(data, callback) {
    Customer.find({},function (error,result) {
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "find error"
        }else{
            myRes.data = result;
        }
        callback(myRes);
    });
}

/**
 *
 * @param data
 * @param callback
 */
function findByFilter(data, callback) {
    Customer.find(data,function (error,result) {
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "find error"
        }else{
            myRes.data = result;
        }
        callback(myRes);
    });
}

/**
 *
 * @param data
 * @param callback
 */
function findItemCount(data, callback) {
    let filter = {};
    if(data){
        filter = data;
    }
    Customer.aggregate(
        [
            {
                $match : filter
            },
            // Grouping pipeline
            {

                $group: {
                    _id : '$orderedItem',
                    count: {$sum: 1}
                }
            },
            // Sorting pipeline
            {"$sort": {"count": -1}}
        ], function (error, result) {
            let myRes = {};
            if (error) {
                myRes.error = error;
                myRes.error.message = "find error"
            } else {
                myRes.data = result;
            }
            callback(myRes);
        });
}

/**
 *
 * @param data
 * @param callback
 */
function findOne(data, callback) {
    Customer
        .findOne(data._id)
        .exec(function (error, result) {
            let myRes = {};
            if (error) {
                myRes.error = error;
                myRes.error.message = "find one error"
            } else {
                myRes.data = result;
            }
            callback(myRes);
        });
}

/**
 *
 * @param data
 * @param callback
 */
function create(data, callback) {
    Customer.create(data,function (error,result) {
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "Create error"
        }else{
            myRes.data = result;
        }
        callback(myRes);
    });
}

/**
 *
 * @param data
 * @param callback
 */
function bulkCreate(data, callback) {
    Customer.collection.insert(data,function (error,result) {
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "Create error"
        }else{
            myRes.data = result;
        }
        callback(myRes);
    });
}

/**
 *
 * @param data
 * @param callback
 */
function bulkDelete(data, callback) {
    let idList = [];
    data.forEach(function (item) {
      idList.push(item._id);
    });
    Customer.remove({_id : { $in: idList}},function (error,result) {
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "Delete error"
        }else{
            myRes.data = result;
        }
        callback(myRes);
    });
}

function update(data, callback) {
    Customer.findOneAndUpdate({_id : data._id}, data, {upsert:false}, function(error, result){
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "Update error"
        }else{
            myRes.data = result;
        }
        callback(myRes);
    });
}

function remove(data, callback) {
    Customer.findByIdAndRemove(data._id,function(error, result){
        let myRes = {};
        if(error){
            myRes.error = error;
            myRes.error.message = "remove error";
            callback(myRes);
        }else{
            myRes.data = true;
        }
        callback(myRes);
    });
}

module.exports = service ;
