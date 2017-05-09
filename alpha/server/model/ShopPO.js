var mongodb = require("mongodb");
//TODO:重构使用  暂时没有用到
function ShopPO(options){
    // constructor({_id,userId,name,address,location,category}) {
    //     this._id = _id?db.ObjectId(_id):new db.ObjectId();
    //     this.name = name;
    //     this.address = address;
    //     this.location = location;
    //     this.userId = userId;
    //     this.category = category;
    // }
    // 
    // 
    var {_id,userId,name,address,location,category} = options;

    this._id = _id?mongodb.ObjectId(_id):new mongodb.ObjectId();
    this.name = name;
    this.address = address;
    this.location = location;
    this.userId = userId;
    this.category = category;
}

ShopPO.prototype = {
    setId:function(id) {
        this._id = mongodb.ObjectId(id) 
    },
    setUserId:function(userId) {
        this.userId = userId;
    },
    setUpdateTime:function(){
        this.updateTime = new Date();
    }
}


module.exports = ShopPO;

