var DB_URL = process.env.DB_URL || '127.0.0.1';
var db = require('./db.js')(DB_URL, "alpha");


exports.createMap = function(userId, mapName = "我的地图") {
    return db.open("user_map").then(function() {
        return db.collection.insert({
            userId: userId,
            mapName: mapName,
            date: new Date()
        })
    }).then(function(data) {
        db.close()
        return data;
    }).catch(function(e) {
        db.close();
        return null;
    })
};


exports.saveMap = function(map) {
    return db.open("user_map").then(function() {
        return db.collection.update({
            _id: db.ObjectId(map.id)
        }, {
            $set: {
                data: map.data
            }
        })
    }).then(function(data) {
        db.close()
        return true;
    }).catch(function(e) {
        db.close();
        return false;
    });
}



exports.createMarketing = function(userId, marketing) {
    marketing.userId = userId;
    marketing.createTime = new Date();
    marketing.status = 0;//0-未开始 1 进行中 2 已结束

    //console.log(marketing);

    return db.open("marketing").then(function() {
        return db.collection.insert(marketing)
    }).then(function(data) {
        db.close()
        //TODO: 这里创建的时候需要同时生成优惠券
        //
    
        return data;
    }).catch(function(e) {
        db.close();
        return null;
    })
};


exports.updateMarketing = function(_id,userId, marketing) {
    marketing.userId = userId;
    marketing.updateTime = new Date();
    marketing.status = 0;//0-未开始 1 进行中 2 已结束

    console.log(marketing);

    return db.open("marketing").then(function() {
        return db.collection.update({_id:db.ObjectId(_id)},{$set:marketing})
    }).then(function(data) {
        db.close()
        //TODO: 这里更新时候从新生成优惠券
        //
    
        return data;
    }).catch(function(e) {
        db.close();
        return null;
    })
};


