var DB_URL = process.env.DB_URL || '127.0.0.1';
var db = require('./db.js')(DB_URL, "alpha");


//TODO:重构使用  暂时没有用到
function QuanPO(options) {
    var { marketingId, status, customerId } = options;

    this.marketingId = marketingId;
    this.status = status;
    this.customer = customer;

}
