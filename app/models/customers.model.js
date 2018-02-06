var mongoose = require('mongoose');

var CustomersSchema = mongoose.Schema({
    name: String,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('customers', CustomersSchema);