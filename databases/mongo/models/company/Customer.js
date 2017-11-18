let mongoose = require('mongoose');
let schema = new mongoose.Schema({
    customerID : { type: Number },
    name : { type: Object },
    gender : { type: String },
    company : { type: String },
    email : { type: String },
    phone : { type: String },
    address : { type: String },
    birthday : { type: Date },
    lastContact : { type: Date },
    customerLifetimeValue : {type : Number}
},{
    timestamps: true,
    strict: false
});

let Customer = mongoose.model("Customer",schema);
module.exports = Customer;
