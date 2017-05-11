var mongodb = require("mongodb");


//TODO:重构使用  暂时没有用到
function CustomerPO(options) {
    var {_id,tel}= options;
    this._id = _id?mongodb.ObjectId(_id):new mongodb.ObjectId();
    this.tel = tel;
}



module.exports = CustomerPO;
