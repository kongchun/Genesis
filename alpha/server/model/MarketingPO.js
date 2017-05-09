var mongodb = require("mongodb");

var MarketingPO = function(options){
    var { _id, 
        title, 
        shop, 
        type=1, 
        startDate, 
        endDate, 
        percent=0, 
        time=0, 
        interval=0, 
        total=0, 
        sex=[], 
        ageRange=[], 
        description, 
        userId, 
        createTime = new Date(), 
        updateTime= new Date(), 
        status =0,
        viewCount = 0,
        downCount= 0,
        usedCount = 0
    } = options;

    this._id = _id ? mongodb.ObjectId(_id) : new mongodb.ObjectId();
    this.title = title;
    this.shop = shop;
    this.type = type; //1-优惠券 2-试用券
    this.startDate = startDate;
    this.endDate = endDate;
    this.percent = percent;
    this.time = time;
    this.interval = interval;
    this.total = total;
    this.sex = sex;
    this.ageRange = ageRange;
    this.description = description;
    this.userId = userId;
    this.createTime = createTime;
    this.updateTime = updateTime;
    this.status = status;//0-未开始 1 进行中 2 已结束
    this.viewCount = viewCount; //查看数
    this.downCount = downCount; //获取数
    this.usedCount = usedCount; //使用数

}

MarketingPO.prototype = {
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

module.exports = MarketingPO;
