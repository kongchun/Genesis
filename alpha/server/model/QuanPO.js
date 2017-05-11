// var DB_URL = process.env.DB_URL || '127.0.0.1';
// var db = require('./db.js')(DB_URL, "alpha");
var mongodb = require("mongodb");
var moment = require('moment');
//TODO:重构使用  暂时没有用到
function QuanPO(options) {
    var {_id, marketingId, status=0, customer,code,createTime=new Date(), usedTime=null} = options;

    this._id = _id ? mongodb.ObjectId(_id) : new mongodb.ObjectId();
    this.marketingId = marketingId;
    this.customer = customer;
    this.code = code?code:generatorCode();
    this.status = status; //0-未使用 1-已使用 2-已过期
    this.createTime = createTime;
    this.usedTime = usedTime;
}

var generatorCode = function(){
	return moment().format('SSSe-mmYY-HHww-DDss')
}

module.exports = QuanPO;